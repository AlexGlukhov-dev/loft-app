import {NavLink} from 'react-router-dom';
import {Box, Drawer, ListItemIcon, MenuItem, MenuList, Typography} from '@mui/material';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const SideMenu = ({showSideBar, setShoWSideBar}) => {

	return (
			<Drawer
					sx={{zIndex: 10}}
					anchor="left"
					open={showSideBar}
					onClose={() => setShoWSideBar(false)}>
				<Box
						sx={{height: '100% ', color: 'primary.bgColor'}}
						p={2}
						pt={6}
						width={250}
						textAlign='center'
						role="presentation">
					<Typography variant="h6" component="div">
						Меню
					</Typography>
					<MenuList>
						<NavLink style={{textDecoration: 'none'}} to="/sales" onClick={() => setShoWSideBar(false)}>
							<MenuItem>
								<ListItemIcon>
									<PointOfSaleIcon fontSize="small" sx={{color: 'primary.bgColor'}}/>
								</ListItemIcon>
								<Typography variant="inherit" sx={{color: 'primary.bgColor'}}>Продажа</Typography>
							</MenuItem>
						</NavLink>
						<NavLink style={{textDecoration: 'none'}} to="/banners" onClick={() => setShoWSideBar(false)}>
							<MenuItem>
								<ListItemIcon>
									<BorderAllIcon fontSize="small" sx={{color: 'primary.bgColor'}}/>
								</ListItemIcon>
								<Typography variant="inherit" sx={{color: 'primary.bgColor'}}>Баннеры</Typography>
							</MenuItem>
						</NavLink>
						<NavLink style={{textDecoration: 'none'}} to="/cards" onClick={() => setShoWSideBar(false)}>
							<MenuItem>
								<ListItemIcon>
									<StyleOutlinedIcon fontSize="small" sx={{color: 'primary.bgColor'}}/>
								</ListItemIcon>
								<Typography variant="inherit" sx={{color: 'primary.bgColor'}}>Карты</Typography>
							</MenuItem>
						</NavLink>
						<NavLink style={{textDecoration: 'none'}} to="/subscription" onClick={() => setShoWSideBar(false)}>
							<MenuItem>
								<ListItemIcon>
									<AssignmentOutlinedIcon fontSize="small" sx={{color: 'primary.bgColor'}}/>
								</ListItemIcon>
								<Typography variant="inherit" sx={{color: 'primary.bgColor'}}>Оплата абонементов</Typography>
							</MenuItem>
						</NavLink>
					</MenuList>
				</Box>
			</Drawer>
			// <>
			// 	{showSideBar && <Box sx={{
			// 		display: 'flex',
			// 		flexDirection: 'column',
			// 		position: 'absolute',
			// 		left: '0px',
			// 		top: '48px',
			// 		width: '320px',
			// 		height: 'calc(100% - 48px)',
			// 		backgroundColor: 'primary.bgColor',
			// 		color: 'primary.white',
			// 		opacity: 0.95,
			// 		zIndex: 15
			// 	}}>
			// 		<MenuList>
			// 			<NavLink to="/banners" onClick={() => setShoWSideBar(false)}>
			// 				<MenuItem>
			// 					<ListItemIcon>
			// 						<BorderAllIcon fontSize="small" sx={{color: 'primary.white'}}/>
			// 					</ListItemIcon>
			// 					<Typography variant="inherit" sx={{color: 'primary.white', textDecoration: 'none'}}>Баннеры</Typography>
			// 				</MenuItem>
			// 			</NavLink>
			// 		</MenuList>
			// 	</Box>}
			// </>
	)
};

export default SideMenu;








































