import {Box, Paper, /*Typography*/} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import SubscriptionTableItem from './SubscriptionTableItem';
import SubscriptionTableHead from './SubscriptionTableHead';

const SubscriptionTable = ({subs, setOpenPayDialog}) => {
  const titles = [
    '№',
    'Абонимент',
    'Цена',
    'Покупатель',
    'Оплатить'
  ];

  return (<Box m={2} mt={0}>
      <TableContainer component={Paper} elevation={4}
                      sx={{maxWidth: 1170, maxHeight: 460, overflowY: 'auto', m: '0 auto'}}>
        <Table sx={{minWidth: 650}} stickyHeader aria-label="catalog table">
          <SubscriptionTableHead headTitles={titles}/>
          <TableBody>
            {subs.map((sub, idx) => (
              <SubscriptionTableItem key={sub.id} sub={sub} num={idx} setOpenPayDialog={setOpenPayDialog}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default SubscriptionTable;