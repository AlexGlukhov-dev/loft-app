import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {addGood, deleteGood} from '../../../store/slices/goodsSlice';

import TableCell from '@mui/material/TableCell';
import {IconButton, Tooltip} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableRow from '@mui/material/TableRow';

import AmountStepper from '../../../UI/AmountStepper';
import {formatter} from '../../../utils';

const ServiceTableItem = ({currentNum, good, showAlert}) => {
	const dispatch = useDispatch();

	const [amount, setAmount] = useState(good.AMOUNT);

	const handleChange = e => {
		const invalidInput = isNaN(+e.target.value)  || +e.target.value === 0;
		const maxInputValue = +e.target.value >= good.REMAINS;

		if (invalidInput) {
			setAmount(1);
			dispatch(addGood({...good, AMOUNT: 1}))
		} else if (maxInputValue) {
			setAmount(good.REMAINS);
			dispatch(addGood({...good, AMOUNT: good.REMAINS}))
		} else {
			setAmount(e.target.value);
			dispatch(addGood({...good, AMOUNT: e.target.value}))
		}
	};

	return (
		<TableRow	sx={{'&:last-child td, &:last-child th': {border: 0}}}>
			<TableCell component="th" scope="row">{currentNum}</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="left">{good.NAME}</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="center">{+good.REMAINS - +good.AMOUNT}</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="center">
				<AmountStepper
					id={good.ID}
					good={good}
					amount={amount}
				 setAmount={setAmount}
				 handleChange={handleChange}/>
			</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="center">{formatter.format(good.PRICE)}</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="center">{formatter.format(good.PRICE * amount)}</TableCell>
			<TableCell sx={{padding: '0 4px'}} align="center">
				<Tooltip title="Удалить" placement="bottom-start" arrow>
			<span>
		<IconButton
			aria-label="delete"
			size="small"
			color='error'
			fontSize='inherit'
			onClick={() => {
				showAlert(true);
				dispatch(deleteGood(good));
				setAmount(1);
			}}>
			<DeleteForeverIcon/>
		</IconButton>
				</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	)
};

export default ServiceTableItem;