import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ServicesTableHead = () => {
	const titles = ['№', 'Товар', 'Остаток', 'Количество', 'Цена', 'Сумма', 'Удалить'];

	return (
		<TableHead>
			<TableRow>
				{titles.map(title => <TableCell sx={{padding: 1, color: 'primary.white', backgroundColor: '#253053!important'}}
																				align="center"
				key={title}>
					{title}
				</TableCell>)}
			</TableRow>
		</TableHead>
	)
};

export default ServicesTableHead;