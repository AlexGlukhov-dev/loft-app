import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {deleteBannerData} from '../../store/slices/bannersSlice'

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	ImageListItem,
	ImageListItemBar, Snackbar,
	Stack,
	Tooltip
} from '@mui/material';
import {BANNERS_API} from '../../API';
import {Alert} from "@mui/lab";
// import {BANNERS_API, BANNERS_MOCK_DATA} from '../../API';

const Banner = ({id, img, title, start, end}) => {
	const [open, setOpen] = useState(false);
	const [openEditAlert, setOpenEditAlert] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector(state => state.user.user.token);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenEditAlert(false);
	};

	return <Grid item xs={12} sm={6}>
		<ImageListItem key={img} sx={{width: '100%', overflow: 'hidden', padding: '0 0 50% 0'}}>
			<img
				style={{position: 'absolute', top: 0, left: 0, zIndex: 5}}
				src={img}
				// src={`${img}?w=248&fit=crop&auto=format`}
				// srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
				alt={title}
				loading="lazy"
			/>
			<ImageListItemBar
				sx={{zIndex: 10}}
				title={`активен c ${new Date(start).toLocaleDateString()} до ${new Date(end).toLocaleDateString()}`}
				actionIcon={
					<Stack direction="row">
						<Tooltip title="Удалить баннер" arrow placement="top">
							<IconButton
								sx={{color: 'primary.main'}}
								onClick={() => setOpen(true)}
								aria-label="delete banner"
							>
								<DeleteForeverIcon/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Редактировать баннер" arrow placement="top">
							<IconButton
								sx={{color: 'primary.blue'}}
								aria-label="edit banner"
								onClick={() => 	setOpenEditAlert(true)}
							>
								<EditIcon/>
							</IconButton>
						</Tooltip>
					</Stack>
				}
			/>
		</ImageListItem>
		<Snackbar open={openEditAlert} autoHideDuration={6000}  anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
				Редактирование будет скоро доступно!
			</Alert>
		</Snackbar>
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Удаление баннера</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{color: 'primary.main'}}>Вы собираетесь удалить текущий баннер без возможности
					восстановления!</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => {
					dispatch(deleteBannerData({url: BANNERS_API, token, id}));
					setOpen(false)
				}}>Удалить</Button>
				<Button variant="outlined" color="secondary" onClick={() => setOpen(false)} autoFocus>Отмена</Button>
			</DialogActions>
		</Dialog>
	</Grid>
};

export default Banner;