import {Box, Paper, Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import CatalogItem from './CatalogItem';
import CatalogHead from './CatalogHead';

const Catalog = ({goods, search, showAlert}) => {
	const titles = [
		'№',
		'Товар',
		'Остаток',
		'Цена',
		'Добавить'
	];

	const sortedGoods = [...goods];

	if (goods.length) {
		sortedGoods.sort((a, b) => a.NAME > b.NAME ? 1 : -1)
	}

	let filteredGoods;

	if (!search) {
		filteredGoods = sortedGoods
	} else {
		filteredGoods = sortedGoods.filter(good => good.NAME.toLowerCase().includes(search.toLowerCase()));
	}

	return (<Box m={2} mt={0}>
			<Typography variant='h6'>Каталог товаров</Typography>
			<TableContainer component={Paper} elevation={4}
											sx={{maxWidth: 1170, maxHeight: 216, overflowY: 'auto', m: '0 auto'}}>
				<Table sx={{minWidth: 650}} stickyHeader aria-label="catalog table">
					<CatalogHead headTitles={titles}/>
					<TableBody>
						{filteredGoods.map((good, idx) => (
							<CatalogItem key={good.ID} good={good} num={idx} showAlert={showAlert}/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
};

export default Catalog;