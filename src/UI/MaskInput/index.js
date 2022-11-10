import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import React from "react";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="0000"
			definitions={{
				'#': /[1-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

// TextMaskCustom.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	onChange: PropTypes.func.isRequired,
// };

// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
// 	const { onChange, ...other } = props;
//
// 	return (
// 		<NumberFormat
// 			{...other}
// 			getInputRef={ref}
// 			onValueChange={(values) => {
// 				onChange({
// 					target: {
// 						name: props.name,
// 						value: values.value,
// 					},
// 				});
// 			}}
// 			thousandSeparator
// 			isNumericString
// 			prefix="$"
// 		/>
// 	);
// });
//
// NumberFormatCustom.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	onChange: PropTypes.func.isRequired,
// };

export default function FormattedInputs({id, value, handleChange}) {
	// const [value, setValue] = useState('1'
	// );
	//
	// const handleChange = (event) => {
	// 	setValue(value);
	// };

	return (
		<Box
			sx={{
				'& > :not(style)': {
					m: 1,
				},
			}}
		>
			<FormControl >
				<Input
					value={value}
					onChange={handleChange}
					name="textmask"
					id={id}
					inputComponent={TextMaskCustom}
					sx={{width:'50px'}}
				/>
			</FormControl>
		</Box>
	);
}