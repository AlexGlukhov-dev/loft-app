import {TextField, MenuItem} from '@mui/material';
import {useField, useFormikContext} from 'formik';

const SelectWrapper = ({
												 name,
												 options,
												 ...otherProps
											 }) => {
	const {setFieldValue} = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = evt => {
		const {value} = evt.target;
		setFieldValue(name, value);
	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		variant: 'outlined',
		fullWidth: true,
		onChange: handleChange
	};

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<TextField {...configSelect}
							 sx={{
								 '& label.Mui-focused': {
									 color: 'primary.bgColor',
								 },
								 '& .MuiOutlinedInput-root': {
									 '& fieldset': {
										 borderColor: 'secondary.main',
									 },
									 '&:hover fieldset': {
										 borderColor: 'primary.bgColor',
									 },
									 '&.Mui-focused fieldset': {
										 borderColor: 'primary.bgColor',
									 },
								 },
							 }}>
			{options.map(club => {
				return (
					<MenuItem key={club.name} value={club.name}>
						{club.name}
					</MenuItem>
				)
			})}
		</TextField>
	);
};

export default SelectWrapper;
