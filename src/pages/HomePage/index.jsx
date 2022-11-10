import {useDispatch} from 'react-redux';

import {Box} from '@mui/material';

import {setCurrentPage} from '../../store/slices/userSlice';
import bgImage from '../../assets/homepage_bg.jpg';
import PageTitle from '../../UI/PageTitle';

const HomePage = () => {
	const dispatch = useDispatch();
	dispatch(setCurrentPage('Домашняя страница'));

	return (
		<>
			<Box sx={{
				display: 'grid',
				placeContent: 'start',
				paddingTop: '48px',
				height: '100vh',
				backgroundColor: 'secondary.light',
				backgroundImage: `url(${bgImage})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'top',
				backgroundSize: 'cover'
			}}>
				<Box p={2}>
					<PageTitle title='Домашняя страница' color='primary.white'/></Box>
			</Box>
		</>
	);
};

export default HomePage;