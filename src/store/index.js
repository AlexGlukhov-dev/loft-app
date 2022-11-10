import { configureStore } from '@reduxjs/toolkit';
import clubsReducer from './slices/clubsSlice';
import userReducer from './slices/userSlice';
import bannersReducer from './slices/bannersSlice';
import goodsReducer from './slices/goodsSlice';
import buyersReducer from './slices/buyersSlice';
import subscriptionsReducer from './slices/subscriptionSlice';

export default configureStore({
	reducer: {
		clubs: clubsReducer,
		user: userReducer,
		banners: bannersReducer,
		goods: goodsReducer,
		buyers: buyersReducer,
		subscriptions: subscriptionsReducer,
	}
});

