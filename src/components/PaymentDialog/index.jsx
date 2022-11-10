import React from 'react';
import {
  Autocomplete, Button, Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Grid, InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import {formatter} from "../../utils";
import SimpleTable from "../../UI/SimpleTable";

const PaymentDialog = (
  {
    openPayDialog,
    setOpenPayDialog,
    buyersValue,
    autocompleteUsersHandler,
    inputBuyersValue,
    autocompleteInputHandler,
    buyersOptions,
    payment,
    handlePayment,
    handleCashSum,
    cashSum,
    purchasedGoods,
    totalPrice,
    cancelPayment,
    card,
    proceedPayment
  }
) => {
  return (
    <Dialog open={openPayDialog} onClose={() => setOpenPayDialog(false)}>
      <DialogTitle sx={{paddingBottom: '8px', color: 'primary.accent'}}>Подтвердите оплату!</DialogTitle>
      <DialogContent>
        <Paper elevation={2}>
          <Autocomplete
            value={buyersValue}
            onChange={autocompleteUsersHandler}
            inputValue={inputBuyersValue}
            onInputChange={autocompleteInputHandler}
            id="search-buyer"
            options={buyersOptions}
            sx={{width: '100%', mt: '5px', mb: '10px'}}
            renderInput={(params) => <TextField {...params} size="small" label="Номер карты"/>}
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
        <SimpleTable goods={purchasedGoods} totalPrice={totalPrice}/>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{color: 'primary.accent', zIndex: 10}}
          onClick={cancelPayment}
          autoFocus>Отмена</Button>
        <Button
          sx={{zIndex: 10}}
          disabled={!card}
          variant="outlined"
          color='success'
          onClick={proceedPayment}>Оплатить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;