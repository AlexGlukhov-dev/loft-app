import {useSelector} from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {Box, Typography} from '@mui/material';

import ServiceTableItem from './ServiceTableItem';
import ServicesTableHead from './ServicesTableHead';

export default function ServicesTable({showAlert}) {
	const purchasedGoods = useSelector(state => state.goods.purchasedGoods);

	return (<Box m={2} mt={0}>
			<Typography variant='h6'>Чек</Typography>
			<TableContainer component={Paper} sx={{maxWidth: '1170px', m: '0 auto', maxHeight: 200, overflowY: 'auto'}}>
				<Table sx={{minWidth: 650}} stickyHeader aria-label="simple table">
					<ServicesTableHead/>
					<TableBody>
						{purchasedGoods.map((good, i) => (
							<ServiceTableItem key={good.ID} currentNum={i + 1} good={good} showAlert={showAlert}/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}