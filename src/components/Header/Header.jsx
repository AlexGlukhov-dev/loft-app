import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {logout} from '../../store/slices/userSlice';

import {AppBar, Avatar, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

import {ReactComponent as Logo} from '../../assets/logo.svg';

export default function Header({setShowSideBar}) {
	// const {first_name, last_name, photo_bitrix} = useSelector(state => state.user.user.user);
	const userData = useSelector(state => state.user.user.user);
	// const first_name = 'Иван';
	// const last_name = 'Иванов';
	// const photo_bitrix = '';

	const dispatch = useDispatch();
	// const {currentPage} = useSelector(state => state.user);
	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<AppBar position="fixed" sx={{backgroundColor: 'primary.bgColor'}}>
			<Toolbar variant="dense">
				<Grid container alignItems='center'>
					<Grid item xs={1}>
						<IconButton
							edge="start"
							sx={{mr: 2}}
							color="inherit"
							aria-label="menu"
							onClick={setShowSideBar}>
							<MenuIcon/>
						</IconButton>
					</Grid>
					<Grid item xs={8} pt={0.5}>
						<Link to='/' >
							<Logo/>
					</Link>
					</Grid>
					{/*<Grid item xs={6}><Typography sx={{textAlign: 'center'}} color='primary.white'>{currentPage}</Typography></Grid>*/}
					<Grid item xs={2}
								sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						{userData && <>
							<Avatar alt={`${userData.first_name} ${userData.last_name}`} src={userData.photo_bitrix} sx={{mr: 1}}/>
							<Typography variant="subtitle2" color="primary.white"
													sx={{lineHeight: 1}}>{`${userData.first_name} ${userData.last_name}`}</Typography>
							</>
						}
					</Grid>
					<Grid item xs={1} sx={{textAlign: 'right'}}>
						<IconButton aria-label="delete" sx={{color: 'primary.white'}} onClick={logoutHandler}>
							<ExitToAppIcon/>
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}