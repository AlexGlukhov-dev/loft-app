import {useDispatch, useSelector} from 'react-redux';

import {addGood} from '../../../store/slices/goodsSlice';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {IconButton, Tooltip} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {formatter} from "../../../utils";

const CatalogItem = ({good, num, showAlert}) => {
	const purchasedGoods = useSelector(state => state.goods.purchasedGoods);
	const dispatch = useDispatch();

	const addGoodHandler = () => {
			const goodIsInCart = purchasedGoods.find(item => item.ID === good.ID);
			if (goodIsInCart)	return;
			dispatch(addGood({...good, AMOUNT: 1}));
			showAlert(true)
	};

	return (
		<TableRow
			key={good.ID}
			sx={{'&:last-child td, &:last-child th': {border: 0}, '&:hover td': {background: '#e8edff'}
			}}>
			<TableCell align="center" sx={{padding: '0 16px'}}>
				{num + 1}
			</TableCell>
			<TableCell align="left" sx={{padding: '0 16px'}}>{good.NAME}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>{good.REMAINS}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>{formatter.format(good.PRICE)}</TableCell>
			<TableCell align="center" sx={{padding: '0 16px'}}>
				<Tooltip title="Добавить" placement="left-start" arrow>
			<span>
			<IconButton
				aria-label="add"
				size="small"
				color='success'
				onClick={addGoodHandler}>
				<AddTaskIcon/>
			</IconButton>
			</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	)
};

export default CatalogItem;