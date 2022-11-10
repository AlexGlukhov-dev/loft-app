import {useState} from 'react';

import SideMenu from '../SideMenu/SideMenu';
import Header from '../Header/Header';
import {Outlet} from 'react-router-dom';

const Layout = () => {
	const [showSideBar, setShowSideBar] = useState(true);

	const showSideBarHandler = () => {
		setShowSideBar(prev => !prev)
	};

	return (
		<>
			<Header setShowSideBar={showSideBarHandler}/>
			<SideMenu showSideBar={showSideBar} setShoWSideBar={setShowSideBar}/>
			<Outlet/>
		</>
	)
};

export default Layout;