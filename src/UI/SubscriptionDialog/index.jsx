import React, {useEffect, useState} from 'react';
import {
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import {executeAxios, formatter} from "../../utils";
import SubscriptionDialogTable from "../SubscriptionDialogTable";
import {useDispatch, useSelector} from "react-redux";
import {clearSubscribe, deleteSubscribe} from "../../store/slices/subscriptionSlice";
import cmd from "node-cmd";
import fs from "fs";
import iconv from "iconv-lite";
import {v4 as uuidv4} from "uuid";
import {SUBSCRIPTION_PAYMENT} from "../../API";


const SubscriptionDialog = (
  {
    openPayDialog,
    setOpenPayDialog,
    subscribe,
    setShowAlert,
    setStatusCode,
    setShowDeleteAlert
  }
) => {
  const dispatch = useDispatch();
  const totalPrice = Number(useSelector(state => state.subscriptions.subscribe[0].transactionAmount));
  const [payment, setPayment] = useState('cash-payment')
  const [cashSum, setCashSum] = useState(prev => totalPrice)

  useEffect(() => {
    setCashSum(totalPrice)
  }, [totalPrice])

  const handlePayment = event => {
    setPayment(event.target.value);
    if (payment === 'cashless-payment') setCashSum(totalPrice)
  };

  const handleCashSum = event => {
    let val = +event.target.value;
    if (!isNaN(val) || event.key === ".")  {
      setCashSum(event.target.value);
    }
  };

  const cancelPayment = () => {
    setOpenPayDialog(false);
    dispatch(clearSubscribe());
    setCashSum(totalPrice)
    setShowDeleteAlert(true)
  };



  const proceedPayment = (sub) => {
    const {id, cashier, contact,date, dealTitle, transactionAmount} = sub[0]
    const data = {
      id,
      cashier,
      contact,
      date,
      dealTitle,
      transactionAmount,
      paymentType: payment
    }

    if (payment === 'cashless-payment') {
      const price = totalPrice.toFixed(2).replace('.', '');
      cmd.runSync(`C:\\Arcus2\\CommandLineTool\\bin\\CommandLineTool.exe /o1 /a${price} /c643`);

      const getCheck = () => {
        if (fs.existsSync('C:\\Arcus2\\cheq.out') ){
          const read = fs.readFileSync('C:\\Arcus2\\cheq.out')
          const encodedData = iconv.decode(read, 'win1251')
          const arrData = encodedData.split('\n');
          const strings = [];
          arrData.forEach(item => {
            strings.push({"type": "text",
              "text": item,
              "alignment": "left"})
          })
          const responseData = {
            "uuid": uuidv4(),
            "id": id,
            "paymentType": payment,
            "cheque": [
              {
                "type": "nonFiscal",
                "items": strings
              }
            ]
          }
          executeAxios(SUBSCRIPTION_PAYMENT, responseData)
            .then(data => {
              setStatusCode(data.status)
              setShowAlert(true)
              dispatch(deleteSubscribe(id))
            })
            .catch(error => {
              setStatusCode(error.response.status)
              setShowAlert(true)
            });

          fs.unlinkSync('C:\\Arcus2\\cheq.out');
        } else {
          setTimeout(() => {
            getCheck();
          }, 1000)
        }
      }

      getCheck()
    }else {
      const responseData = {
        "uuid": uuidv4(),
        "id": id,
        "paymentType": payment,
        "cheque": data
      }
      executeAxios(SUBSCRIPTION_PAYMENT, responseData)
        .then(data => {
          setStatusCode(data.status)
          setShowAlert(true)
          dispatch(deleteSubscribe(id))
        })
        .catch(error => {
          setStatusCode(error.response.status)
          setShowAlert(true)
        });
    }

    setOpenPayDialog(false)
  };

  return (
    <Dialog open={openPayDialog} onClose={() => setOpenPayDialog(false)}>
      <DialogTitle sx={{paddingBottom: '8px', color: 'primary.accent'}}>Подтвердите оплату!</DialogTitle>
      <DialogContent>
        <Paper elevation={2} sx={{marginBottom: "8px", paddingTop: "10px"}}>
          <TextField
            fullWidth
            size="small"
            value={subscribe[0].contact}
            label='Имя покупателя'
            variant="outlined"
            disabled
          />
        </Paper>
        <Paper elevation={2} sx={{marginBottom: '10px', padding: '16px'}}>
          <Typography variant="body1" color='primary.accent'>Выберете способ оплаты</Typography>
          <Grid container>
            <Grid item>
              <FormControl>
                <RadioGroup
                  name='payment-select-group'
                  value={payment}
                  onChange={handlePayment}
                >
                  <FormControlLabel control={<Radio/>} label='Оплата наличными' value='cash-payment'/>
                  <FormControlLabel control={<Radio/>} label='Оплата безнал' value='cashless-payment'/>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Сумма наличными"
                size="small"
                value={cashSum}
                onChange={handleCashSum}
                disabled={payment !== 'cash-payment'}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><CurrencyRubleIcon fontSize="small"/></InputAdornment>
                }}/>
              {payment === 'cash-payment' && <Typography variant="body2" color='primary.accent'
                                                         mt={1}>Сдача: {(cashSum - totalPrice) > 0 ? formatter.format(cashSum - totalPrice) : 0} руб.</Typography>}
            </Grid>
          </Grid>
        </Paper>
        <SubscriptionDialogTable subs={subscribe} totalPrice={totalPrice}/>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{color: 'primary.accent', zIndex: 10}}
          onClick={cancelPayment}
          autoFocus>Отмена</Button>
        <Button
          sx={{zIndex: 10}}
          variant="outlined"
          disabled={+cashSum < +totalPrice}
          color='success'
          onClick={() => proceedPayment(subscribe)}>Оплатить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog;