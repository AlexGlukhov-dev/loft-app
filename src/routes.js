import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import BannersPage from './pages/BannersPage';
import SalesPage from './pages/SalesPage';
import CardsPage from "./pages/CardsPage";
import SubscriptionPage from "./pages/SubscriptionPage";

export const useRoutes = isAuthorized => {
	if (isAuthorized) {
	// if (true) {

		return (
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="home" element={<HomePage />} />
					<Route path="sales" element={<SalesPage/>} />
					<Route path="banners" element={<BannersPage/>} />
					<Route path="cards" element={<CardsPage/>} />
					<Route path="subscription" element={<SubscriptionPage/>} />
					<Route path="*" element={<HomePage />} />
				</Route>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<LoginPage />} />
		</Routes>
	)
};