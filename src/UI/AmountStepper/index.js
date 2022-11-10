import {useDispatch} from 'react-redux';
import {Box, Grid, IconButton, TextField, Tooltip} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {addGood} from "../../store/slices/goodsSlice";

const AmountStepper = ({id, good, amount, handleChange, setAmount}) => {
	const dispatch = useDispatch();

	const addGoodHandler = () => {
	setAmount(+amount + 1);
	dispatch(addGood({...good, AMOUNT: amount + 1}))
};

	const subGoodHandler = () => {
		setAmount(+amount - 1);
		dispatch(addGood({...good, AMOUNT: amount - 1}))
	};

	return <>
		<Grid container justifyContent='center' alignItems='center' sx={{flexWrap: 'nowrap'}}>
			<Grid item>
				<Tooltip title="Уменьшить количество" placement="bottom-start" arrow>
					<span>
				<IconButton
					aria-label="sub"
					size="small"
					color='error'
					disabled = {amount < 2}
					onClick={subGoodHandler}>
					<IndeterminateCheckBoxIcon/>
				</IconButton>
					</span>
				</Tooltip>
			</Grid>
			<Grid item>
				<Box
					component="form"
					sx={{
						'& > :not(style)': {m: 1, width: '12ch'},
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id={id}
						value={amount}
						onInput={handleChange}
						size='small'
						sx={{margin: '0!important'}}
					/>
				</Box>
			</Grid>
			<Grid item>
				<Tooltip title="Увеличить количество" placement="bottom-start" arrow>
					<span>
				<IconButton
					aria-label="add"
					size="small"
					color='success'
					disabled={good.REMAINS === +amount}
					onClick={ addGoodHandler} >
					<AddBoxIcon/>
				</IconButton>
						</span>
				</Tooltip>
			</Grid>
		</Grid>
	</>
};

export default AmountStepper;