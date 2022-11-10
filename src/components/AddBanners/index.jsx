import {useSelector} from 'react-redux';

import {Box, Button, CircularProgress, Grid, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

import Picker from '../../UI/Picker';
import noPhoto from '../../../public/DB/no-photo.png';

const AddBanners = ({start, setStart, end, setEnd, siteImage, tvImage, uploadSiteHandler, uploadTvHandler}) => {
	const { status} = useSelector(state => state.banners);

	const Input = styled('input')({
		display: 'none',
	});

	return (
		<Stack>
			{ status === 'loading' && <CircularProgress
				sx={{
					position: 'absolute',
					top: '50%',
					left: '45%',
					color: 'primary.bgColor',
					zIndex: 100
				}}
			/>
			}
			<Grid container sx={{justifyContent: 'space-between'}} spacing={1}>
				<Grid item xs={6} sx={{width: '100%'}} mb={2}>
					<Typography variant="body1" mb={1} sx={{textAlign: 'center'}}>Баннер на сайт</Typography>
					<Box mb={2} sx={{
						height: 150,
						width: '100%',
						bgcolor: 'secondary.main',
						borderRadius: 2,
						backgroundImage: `url(${siteImage || noPhoto})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}} xs={12} sm={5}>
					</Box>
					<label htmlFor="site-image">
						<Input accept=".png, .jpg, .jpeg" id="site-image" multiple type="file" onChange={uploadSiteHandler}/>
						<Button variant="contained" component="span" fullWidth>
							Загрузить
						</Button>
					</label>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="body1" mb={1} sx={{textAlign: 'center'}}>Баннер на ТВ</Typography>
					<Box item mb={2} sx={{
						height: 150,
						bgcolor: 'secondary.main',
						borderRadius: 2,
						backgroundImage: `url(${tvImage || noPhoto})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}} xs={12} sm={5}>
					</Box>
					<label htmlFor="tv-image">
						<Input accept="image/*" id="tv-image" multiple type="file" onChange={uploadTvHandler}/>
						<Button variant="contained" component="span" fullWidth>
							Загрузить
						</Button>
					</label>
				</Grid>
				<Grid item xs={12}>
					<Picker
						start={start}
						setStart={setStart}
						end={end}
						setEnd={setEnd}/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default AddBanners;