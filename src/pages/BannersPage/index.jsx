import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {BANNERS_MOCK_DATA} from "../../API";

import {addNewBanner, fetchBanners} from '../../store/slices/bannersSlice';
import {setCurrentPage} from '../../store/slices/userSlice';
import {clearObject} from '../../utils';

import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack} from '@mui/material';

import Banners from '../../components/Banners';
import AddBanners from '../../components/AddBanners';
import PageTitle from "../../UI/PageTitle";

import {BANNERS_API} from '../../API/';

const BannersPage = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector(state => state.user.user.token);
	const data = useMemo(() => ({url: BANNERS_API, token}), [token]);

	// const data = useMemo(() => ({url: BANNERS_MOCK_DATA, token}), [token]);
	dispatch(setCurrentPage('Баннеры'));

	useEffect(() => {
		dispatch(fetchBanners(data))
	}, [data, dispatch]);

	const [bannerStart, setBannerStart] = useState(Date.now());
	const [bannerEnd, setBannerEnd] = useState(Date.now());
	const [siteImage, setSiteImage] = useState('');
	const [tvImage, setTvImage] = useState('');
	const [sImage, setSImage] = useState(null);
	const [tImage, setTImage] = useState(null);

	const uploadSiteHandler = e => {

		if (!e.target.files.length) {
			return
		}

		const files = Array.from(e.target.files);
		files.forEach(file => {

			if (!file.type.match('image')) {
				return
			}
				setSImage(file);
			const reader = new FileReader();

			reader.onload = e => setSiteImage(e.target.result);
			reader.readAsDataURL(file)
		});
	};

	const uploadTvHandler = e => {
		if (!e.target.files.length) {
			return
		}

		const files = Array.from(e.target.files);
		files.forEach(file => {

			if (!file.type.match('image')) {
				return
			}
				setTImage((file));
			const reader = new FileReader();
			reader.onload = e => setTvImage(e.target.result);
			reader.readAsDataURL(file)
		});
	};

	const cancelAddingBanners = () => {
		setOpen(false);
		setSiteImage('./DB/no-photo.png');
		setTvImage('./DB/no-photo.png');
		setBannerStart(Date.now());
		setBannerEnd(Date.now());
	};

	const newBannersData = clearObject({
		url: BANNERS_API,
		token,
		bannerStart,
		bannerEnd,
		sImage,
		tImage
	});

	return (
		<Stack p={2}>
			<Box sx={
				{
					pt: 5,
					pb: 2,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}
			}>
				<PageTitle title='Баннеры'/>
				<Button variant="outlined" size="medium" onClick={() => setOpen(true)}>Добавить баннер</Button>
			</Box>
			<Paper elevation={6}>
				<Banners/>
			</Paper>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle sx={{paddingBottom: '8px'}}>Добавление баннера</DialogTitle>
				<DialogContent sx={{width: "450px"}}>
					<AddBanners
						title="Баннер на сайт"
						start={bannerStart}
						setStart={setBannerStart}
						end={bannerEnd}
						setEnd={setBannerEnd}
						siteImage={siteImage}
						tvImage={tvImage}
						uploadSiteHandler={uploadSiteHandler}
						uploadTvHandler={uploadTvHandler}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" disabled={!siteImage || !tvImage} onClick={() => {
						dispatch(addNewBanner(newBannersData));
						setOpen(false);
						cancelAddingBanners();
					}}>Добавить</Button>
					<Button variant="outlined" color="secondary" onClick={cancelAddingBanners} autoFocus>Отмена</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};

export default BannersPage;