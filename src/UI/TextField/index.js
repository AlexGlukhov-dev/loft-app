import React from 'react';
import {TextField} from '@mui/material';
import {useField} from 'formik';

const styles = {
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
}
};
const TextFieldWrapper = ({
														name,
														...otherProps
													}) => {
	const [field, meta] = useField(name);

	const configTextField = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: 'outlined'
	};

	if (meta && meta.touched && meta.error) {
		configTextField.error = true;
		configTextField.helperText = meta.error;
	}

	return (
		<TextField {...configTextField} sx={{...styles}}/>
	);
};

export default TextFieldWrapper;
