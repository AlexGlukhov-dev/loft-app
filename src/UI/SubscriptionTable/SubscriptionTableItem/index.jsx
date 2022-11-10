import {useDispatch, /*useSelector*/} from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {IconButton, Tooltip} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

import {getSubscribe} from "../../../store/slices/subscriptionSlice"

const CatalogItem = ({sub, num, setOpenPayDialog}) => {
	const dispatch = useDispatch();
	// const {subscribe} = useSelector(state => state.subscriptions)
	const chooseSubHandler = () => {
			dispatch(getSubscribe(sub.id));
			setOpenPayDialog(true)
	};

	return (
		<TableRow
			key={sub.id}
			sx={{'&:last-child td, &:last-child th': {border: 0}, '&:hover td': {background: '#e8edff'}
			}}>
			<TableCell align="center" sx={{padding: '0 16px'}}>
				{num + 1}
			</TableCell>
			<TableCell align="left" sx={{padding: '0 16px'}}>{sub.dealTitle}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>{sub.transactionAmount}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>{sub.contact}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>
				<Tooltip title="Оплатить" placement="left-start" arrow>
			<span>
			<IconButton
				aria-label="add"
				size="small"
				color='success'
				onClick={chooseSubHandler}>
				<AddTaskIcon/>
			</IconButton>
			</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	)
};

export default CatalogItem;