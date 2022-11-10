import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

const CatalogHead = ({headTitles}) => {
	return (
		<TableHead>
			<TableRow>
				{headTitles.map(headItem => {
					return <TableCell key={headItem}
										 align="center"
										 sx={{padding: 1,
											 color: 'primary.white',
											 backgroundColor: '#253053!important'}}>
						{headItem}
					</TableCell>
				})}
			</TableRow>
		</TableHead>
	);
};

export default CatalogHead;