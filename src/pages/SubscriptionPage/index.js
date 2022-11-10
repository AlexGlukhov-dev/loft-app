import React, {useEffect, useState} from 'react';
import {Alert, Box, CircularProgress, Snackbar} from "@mui/material";
import PageTitle from "../../UI/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubscriptions} from "../../store/slices/subscriptionSlice";
import SubscriptionDialog from "../../UI/SubscriptionDialog";
import SubscriptionTable from "../../UI/SubscriptionTable";

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const {subscriptionsData, subscribe} = useSelector(state => state.subscriptions)
  const [openPayDialog, setOpenPayDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [statusCode, setStatusCode] = useState(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  useEffect(() => {
    dispatch(fetchSubscriptions())
  }, [dispatch])

  return (
      <Box
        sx={{height: '100vh', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', pt: 6, position: 'relative'}}>
        <Box pl={2}>
          <PageTitle title='Оплата абонементов'/>
          <Snackbar open={showAlert} autoHideDuration={500}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setShowAlert(false)}>
            <Alert onClose={() => setShowAlert(false)} severity={statusCode === 201 ? "success" : "error"} sx={{width: '100%'}}>
              {statusCode === 201 ? 'Оплата выполнена!' : 'Ошибка оплаты!'}
            </Alert>
          </Snackbar>
          <Snackbar open={showDeleteAlert} autoHideDuration={500}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={() => setShowDeleteAlert(false)}>
            <Alert onClose={() => setShowDeleteAlert(false)} severity="error" sx={{width: '100%'}}>
              Оплата отменена!
            </Alert>
          </Snackbar>
          {!subscriptionsData && <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              color: 'primary.bgColor',
              zIndex: 100
            }}
          />
          }
          {subscriptionsData && <SubscriptionTable subs={subscriptionsData}  setOpenPayDialog={setOpenPayDialog}/>}
          <SubscriptionDialog
            openPayDialog={openPayDialog}
            setOpenPayDialog={setOpenPayDialog}
            subscribe={subscribe}
            setShowAlert={setShowAlert}
            setStatusCode={setStatusCode}
            setShowDeleteAlert={setShowDeleteAlert}
          />

        </Box>
      </Box>
  );
};

export default SubscriptionPage;