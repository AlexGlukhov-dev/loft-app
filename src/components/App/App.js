import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {fetchClubs} from '../../store/slices/clubsSlice'
import {CLUBS_API_SITE} from '../../API'
import {useRoutes} from '../../routes';
import {useAuth} from "../../hooks/useAuth";

const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#ff0600',
				success: '#2e7d32',
				accent: '#ff0004',
				blue: '#304ffe',
				white: '#fff',
				black: '#000',
				bgColor:'#253053'
			},
			secondary: {
				main: '#8e8e8e',
				success: '#00ff0d',
				light: '#f9f9f9',
				info: '#9c27b0',
				infoDark: '#7b1fa2'
			},
			custom: {
				main: '#1b1c29'
			}
		},
	}
);

const App = () => {
	const dispatch = useDispatch();
	// const {isAuth} = useSelector(state => state.user?.user);

	const {isAuth} = useAuth();
	const routes = useRoutes(isAuth);

	// const {authIs} = useAuth();
	// const routes = useRoutes(authIs);
	// console.log(authIs);

	useEffect(() => {
		dispatch(fetchClubs(CLUBS_API_SITE));
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
					{routes}
			</LocalizationProvider>
		</ThemeProvider>
	)
};

export default App;
