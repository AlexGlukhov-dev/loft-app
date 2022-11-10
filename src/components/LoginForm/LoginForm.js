import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';
import {object, string} from 'yup';
import MuiAlert from '@mui/material/Alert';
import {Box, Button, CircularProgress, Snackbar, Typography} from '@mui/material';

import {fetchUser} from '../../store/slices/userSlice';
import {useAuth} from '../../hooks/useAuth';

import Select from '../../UI/Select';
import TextField from '../../UI/TextField';

import classes from './loginForm.module.scss';

const initialValues = {
	username: 'aaaroony@yandex.ru',
	password: 'aaa06129705081974',
	club: ''
};

const MaterialForm = () => {
	const {clubs} = useSelector(state => state.clubs);
	const {error, status} = useAuth();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(!!error);

	useEffect(() => {
		!!error ? setOpen(true) : setOpen(false)
	}, [error]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<Box sx={{
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100vw',
			height: '100vh',
			backgroundColor: 'primary.bgColor'
		}}>
			<Typography sx={{color: 'primary.white'}} variant="h4">
				Авторизация
			</Typography>

			{status === 'loading' && <CircularProgress
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					color: 'primary.bgColor',
					zIndex: 100
				}}
			/>
			}
			<Formik
				initialValues={initialValues}
				validationSchema={object({
					username: string()
						.required("Обязательное поле")
						.min(5, "Некорректный Email или телефон"),
					password: string()
						.required("Введите пароль")
						.min(7, "Пароль должен быть не менее 7 символов"),
					club: string()
						.required('Обязательное поле'),
				})}
				onSubmit={(values, formikHelpers) => {
					localStorage.removeItem("userData");
					const data = {username: values.username, password: values.password};
					dispatch(fetchUser(data));
					setOpen(false);
					formikHelpers.resetForm();
				}}
			>
				{({errors, isValid, touched, dirty}) => (
					<Form className={classes.form}>
						<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
											anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
							<MuiAlert onClose={handleClose} elevation={6} variant="filled" severity="error">{error}</MuiAlert>
						</Snackbar>
						<Select
							name="club"
							label="Клуб"
							options={clubs}
							required
							error={!!errors.club && !!touched.club}
							helperText={(!!touched.club && !!errors.club) ? errors.club : " "}
						/>
						<TextField
							name="username"
							label="Email или Телефон"
							autoComplete="off"
							variant="outlined"
							required
							helperText={!!touched.email ? errors.email : " "}
						/>
						<TextField
							name="password"
							type="password"
							label="Пароль"
							autoComplete="off"
							variant="outlined"
							required
							error={!!errors.password && !!touched.password}
							helperText={(!!touched.password && !!errors.password) ? errors.password : " "}
						/>
						{/*{incorrectData && <Typography variant="caption" color="error">Некорректные данные</Typography>}*/}
						<Button
							sx={{minHeight: '56px'}}
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							disabled={!isValid || !dirty}
						>
							Войти
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default MaterialForm;