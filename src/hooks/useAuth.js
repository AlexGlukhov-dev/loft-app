import {useSelector} from 'react-redux';

export const useAuth = () => {
	const {error, status, isAuth} = useSelector(state => state.user);
	const {token} = useSelector(state => state.user?.user);

	return {
		isAuth,
		error,
		status,
		token
	}
};