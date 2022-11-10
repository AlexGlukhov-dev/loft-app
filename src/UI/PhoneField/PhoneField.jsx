import {TextField} from "@mui/material";
import styled from "styled-components/macro";
import React, {useState} from "react";
import InputMask from "react-input-mask";

const FormikTextField = (props) => {
	const [phone, setPhone] = useState("");
	const {inputRef, onChange, ...other} = props;
	return (
		<InputMask
			{...other}
			getInputRef={inputRef}
			mask="(+7) 999 999 99 99"
			value={phone}
			onChange={(event) => setPhone(event.target.value)}
			onBlur={() => {
			}}
			disabled={false}
			maskChar=" "
		/>
	);
};

export const StyledTextField = styled(TextField)`
  width: 100%;
`;
export default FormikTextField;