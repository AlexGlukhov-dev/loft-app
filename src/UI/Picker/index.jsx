import {Stack, TextField} from '@mui/material';
import {DatePicker} from "@mui/lab";

const Picker = ({start, setStart, end, setEnd}) => {

	return (
		<Stack spacing={3} sx={{width: '100%'}} direction="row">
			<DatePicker
				label="Начало активности"
				onChange={(newValue) => {
					setStart(newValue)
				}}
				value={start}
				renderInput={params => <TextField {...params}/>}/>
			<DatePicker
				label="Конец активности"
				onChange={(newValue) => {
					setEnd(newValue)
				}}
				value={end}
				renderInput={params => <TextField {...params}/>}/>
		</Stack>
	)
};

export default Picker;