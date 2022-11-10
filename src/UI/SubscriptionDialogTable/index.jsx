import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {formatter} from '../../utils';

const SubscriptionDialogTable = ({subs, totalPrice}) => {

  return (
    <TableContainer component={Paper} elevation={4} sx={{bgcolor: '#efefef'}}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Абонимент</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Покупатель</TableCell>
            <TableCell align="right">Дата</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subs.map((sub) => (
            <TableRow
              key={sub.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#fff' }}
            >
              <TableCell component="th" scope="row">
                {sub.dealTitle}
              </TableCell>
              <TableCell align="center">{formatter.format(sub.transactionAmount)}</TableCell>
              <TableCell align="center">{sub.contact}</TableCell>
              <TableCell align="center">{new Date(sub.date).toLocaleString()}</TableCell>
              {/*<TableCell align="right">{formatter.format(+good.PRICE * +good.AMOUNT)}</TableCell>*/}
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell sx={{fontSize: 20, fontWeight: 'bold'}} align="center">Итого:</TableCell>
            <TableCell sx={{fontSize: 20, fontWeight: 'bold'}} align="right">{formatter.format(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionDialogTable;