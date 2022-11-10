import {useSelector} from 'react-redux';

import {Grid, Typography} from '@mui/material';

// import {BANNERS_DATA} from '../../API'

import Banner from '../../UI/Banner';

const Banners = () => {
	const {bannersData} = useSelector( state => state.banners);

	return <Grid container p={2} spacing={0.5}>
		{!bannersData.length && <Typography>Баннеров нет</Typography>}
		{bannersData.map(banner => <Banner
			key={banner._id}
			img={banner.image_site}
			start={banner.date_start}
			end={banner.date_end}
			id={banner._id}
		/>)}
	</Grid>
};

export default Banners;