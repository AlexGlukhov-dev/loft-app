import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from "uuid";
import {executeAxios, formatter} from '../../utils';
import {addGood, clearCart, fetchGoods} from '../../store/slices/goodsSlice';
import {setCurrentPage} from '../../store/slices/userSlice';
import {
	selectedBuyer,
	setOpenShift, fetchCards, selectedCard, clearCardsList,
} from '../../store/slices/buyersSlice';

import {
	Box,
	Button,
	Divider,
	Grid,
	Paper, Snackbar,
	Stack,
	TextField,
	Typography,
	Autocomplete, Alert
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import ServicesTable from '../../components/ServicesTable';
import Catalog from '../../components/Catalog';
import PageTitle from '../../UI/PageTitle';
import cmd from'node-cmd';
import fs from 'fs';
import PaymentDialog from "../../components/PaymentDialog";
const iconv = require('iconv-lite');




const SalesPage = () => {
	const [showCatalog, setShowCatalog] = useState(true);
	const [showGoodAlert, setShowGoodAlert] = useState(false);
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [showPayAlert, setShowPayAlert] = useState(false);
	const [openPayDialog, setOpenPayDialog] = useState(false);
	const [payment, setPayment] = useState('cash-payment');
	const totalPrice = useSelector(state => state.goods.totalPrice);
	const [cashSum, setCashSum] = useState(+totalPrice);
	const dispatch = useDispatch();

	const token = useSelector(state => state.user.user.token);
	const data = useMemo(() => ({token}), [token]);

	useEffect(() => {
		dispatch(fetchGoods(data))
	}, [dispatch, data]);

	const goods = useSelector(state => state.goods.goodsData);
	const purchasedGoods = useSelector(state => state.goods.purchasedGoods);
	const options = [];
	goods.forEach(good => options.push(good.NAME));
	dispatch(setCurrentPage('Продажа'));

	const [value, setValue] = useState(options[0] || null);
	const [inputValue, setInputValue] = useState('');

	const buyer = useSelector(state => state.buyers.buyer);
	const openShift = useSelector(state => state.buyers.openShift);
	const cards = useSelector(state => state.buyers.cards)
	const card = useSelector(state => state.buyers.card)

	const getUserInfo = user => {
		return `${user["lastName"]} ${user["firstName"]} ${user["secondName"]}, карта: ${user["cardID"]}`
	};

	useEffect(() => {
		if (!buyer) setInputBuyersValue('')
	}, [buyer]);

	const buyersOptions = [];
	cards.forEach(user => buyersOptions.push(getUserInfo(user)));

	const [buyersValue, setBuyersValue] = useState(buyersOptions[0] || null);
	const [inputBuyersValue, setInputBuyersValue] = useState('');

	const autocompleteHandler = (event, newValue) => {
		setValue(newValue);
		if (newValue !== null) {
			const selectedGood = goods.find(good => good.NAME === newValue);
			const goodIsInCart = purchasedGoods.find(good => good.ID === selectedGood.ID);
			if (goodIsInCart) return;
			dispatch(addGood(selectedGood, selectedGood.ID));
			setShowGoodAlert(true)
		}
	};

	const autocompleteUsersHandler = (event, newValue) => {
		setBuyersValue(newValue);
		if (newValue !== null) {
			const selectedUser = cards.find(user => getUserInfo(user) === newValue);
			dispatch(selectedCard(selectedUser));
		}
	};

	const autocompleteInputHandler = (event, newInputValue) => {
		if (newInputValue.length > 2) {
			dispatch(fetchCards(newInputValue))
		} else {
			dispatch(clearCardsList())
			dispatch(selectedCard(null))
		}
		setInputBuyersValue(newInputValue);
	};

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
		dispatch(selectedBuyer(null));
		setBuyersValue(null);
		setCashSum(totalPrice)
	};

	const proceedPayment = () => {
		 purchasedGoods.map(good => {
			return {
				"name": good.NAME,
				"price": +Number(good.PRICE).toFixed(0),
				"quantity": good.AMOUNT,
				"sum": good.PRICE * good.AMOUNT,
				"measurement_unit": "шт",
				"payment_method": "full_payment",
				"payment_object": "commodity",
				"vat": {
					"type": "none"
				}
			}
		});


		if(payment === 'cashless-payment'){
			const price = totalPrice.toFixed(2).replace('.', '');
			cmd.runSync(`C:\\Arcus2\\CommandLineTool\\bin\\CommandLineTool.exe /o1 /a${price} /c643`);

			const getCheck = () => {
				if(fs.existsSync('C:\\Arcus2\\cheq.out') ){
					const read = fs.readFileSync('C:\\Arcus2\\cheq.out', () => {})
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
						"request": [
							{
								"type": "nonFiscal",
								"items": strings
							}
						]
					}
					executeAxios('http://127.0.0.1:16732/api/v2/requests', responseData)
					fs.unlinkSync('C:\\Arcus2\\cheq.out');
				} else {
					setTimeout(() => {
						getCheck();
					}, 1000)
				}
			}
			getCheck()
		}

		dispatch(clearCart());
		setOpenPayDialog(false);
		dispatch(selectedBuyer(null));
		setBuyersValue(null);
		setPayment('cash-payment');
		dispatch(setOpenShift());
		setShowPayAlert(true)
	};

	const cancelReceipt = () => {
		dispatch(clearCart())
	};

	const sendPaymentData = () => {
		setOpenPayDialog(true);
		setCashSum(totalPrice);
	};

	return (
		<Box
			sx={{height: '100vh', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', pt: 6, position: 'relative'}}>
			<Box pl={2}>
				<PageTitle title='Продажа'/>
			</Box>
			<Paper sx={{marginLeft: 2, marginRight: 2, bgcolor: 'primary.bgColor'}} elevation={6}>
				<Grid container mt={1} p={2} columnSpacing={1} sx={{marginLeft: 'auto', marginRight: 'auto'}}>
					<Grid item xs={6} lg={8}>
						<Stack spacing={1}>
							<Box
								p={1}
								mb={1}
								sx={{
									maxWidth: '100%',
									bgcolor: 'primary.white',
									borderRadius: 1
								}}>
								<Snackbar open={showGoodAlert} autoHideDuration={500}
													anchorOrigin={{vertical: 'top', horizontal: 'center'}}
													onClose={() => setShowGoodAlert(false)}>
									<Alert onClose={() => setShowGoodAlert(false)} severity="success" sx={{width: '100%'}}>
										Товар добавлен!
									</Alert>
								</Snackbar>
								<Snackbar open={showDeleteAlert} autoHideDuration={500}
													anchorOrigin={{vertical: 'top', horizontal: 'center'}}
													onClose={() => setShowDeleteAlert(false)}>
									<Alert onClose={() => setShowDeleteAlert(false)} severity="error" sx={{width: '100%'}}>
										Товар удален!
									</Alert>
								</Snackbar>
								<Snackbar open={showPayAlert} autoHideDuration={1500}
													anchorOrigin={{vertical: 'top', horizontal: 'center'}}
													onClose={() => setShowPayAlert(false)}>
									<Alert onClose={() => setShowPayAlert(false)} severity="success" sx={{width: '100%'}}>
										Оплата произведена!
									</Alert>
								</Snackbar>
								<Autocomplete
									value={value}
									onChange={autocompleteHandler}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									id="search-good"
									options={options}
									sx={{width: '100%'}}
									renderInput={(params) => <TextField {...params} size='small' label="Поиск товара"/>}
								/>
							</Box>
							<Grid container justifyContent={"space-between"} mb={1}>
								<Grid item>
									<Typography
										color='primary.white'
										sx={{'& span': {color: 'secondary.success'}}}>
										Кассир:
										<span> Смирнова Ирина</span>
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										color='primary.white'
										sx={{'& span': {color: `${openShift ? 'secondary.success' : 'primary.accent'}`}}}>
										Смена:
										<span>{`${openShift ? ' Открыта' : ' Закрыта'}`}</span>
									</Typography>
								</Grid>
							</Grid>
							<Grid item>
								<Button
									sx={{backgroundColor: 'secondary.info', '&:hover': {backgroundColor: 'secondary.infoDark'}}}
									variant="contained"
									startIcon={<ListIcon/>}
									onClick={() => setShowCatalog(prev => !prev)}>
									Каталог / Чек
								</Button>
							</Grid>
						</Stack>
					</Grid>
					<Grid item xs={6} lg={4}>
						<Paper sx={{height: '100%', padding: 1}}>
							<Stack spacing={1} p={1}
										 sx={{height: '100%', border: '2px solid', borderRadius: 1.5, borderColor: 'primary.main'}}>
								<Grid item sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									flexWrap: 'wrap',
									width: '100%'
								}}>
									<Typography variant="h5">Всего:</Typography>
									<Typography variant="h4"
															sx={{color: 'primary.success'}}>{formatter.format(+totalPrice)}<CurrencyRubleIcon/></Typography>
								</Grid>
								<Divider/>
								<Grid item sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									flexWrap: 'wrap',
									width: '100%'
								}}>
									<Typography variant="h5">К оплате:</Typography>
									<Typography variant="h4"
															sx={{color: 'primary.main'}}>{formatter.format(+totalPrice)}<CurrencyRubleIcon/></Typography>
								</Grid>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Paper>
			{showCatalog && <Catalog goods={goods} search={value} showAlert={setShowGoodAlert}/>}
			{!showCatalog && purchasedGoods.length ? <ServicesTable showAlert={setShowDeleteAlert}/> : null}
			{!showCatalog && !purchasedGoods.length ? <Paper sx={{margin: 2}} elevation={6}>
					<Typography sx={{color: 'primary.main', fontWeight: 'bold'}} p={2} variant="subtitle1" align="center">
						Товары не выбраны
					</Typography>
				</Paper>
				: null
			}
			<PaymentDialog openPayDialog={openPayDialog}
			setOpenPayDialog={setOpenPayDialog}
			buyersValue={buyersValue}
			autocompleteUsersHandler={autocompleteUsersHandler}
			inputBuyersValue={inputBuyersValue}
			autocompleteInputHandler={autocompleteInputHandler}
			buyersOptions={buyersOptions}
			payment={payment}
			handlePayment={handlePayment}
			handleCashSum={handleCashSum}
			cashSum={cashSum}
			purchasedGoods={purchasedGoods}
			totalPrice={totalPrice}
			cancelPayment={cancelPayment}
			card={card}
			proceedPayment={proceedPayment}/>
			<Grid container sx={{position: 'absolute', bottom: 8, justifyContent: 'flex-end'}}>
				<Grid item mr={2}>
					<Button
						sx={{zIndex: 10}}
						variant="contained"
						startIcon={<HighlightOffIcon/>}
						disabled={!purchasedGoods.length}
						onClick={cancelReceipt}>
						Отменить чек
					</Button>
				</Grid>
				<Grid item mr={2}>
					<Button
						variant="contained"
						disabled={!purchasedGoods.length}
						startIcon={<CheckCircleOutlineIcon/>}
						sx={{backgroundColor: 'success.main', '&:hover': {bgcolor: 'success.dark'}, zIndex: 10}}
						onClick={sendPaymentData}>
						Принять оплату
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
};

export default SalesPage;