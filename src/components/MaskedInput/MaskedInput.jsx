import { TextField } from "@mui/material";
import React from "react";
import InputMask from "react-input-mask";

const MaskedInput = ({
  value,
  mask,
  onChange,
  onBlur,
  name,
  label,
  touched,
  errors,
  onInput
}) => {
  return (
    <InputMask  onInput={onInput} mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
      {() => (
        <TextField
          name={name}
          label={label}
          helperText={touched ? errors : ""}
          error={touched && Boolean(errors)}
          fullWidth
          variant="standard"
          onInput={onInput}
        />
      )}
    </InputMask>
  );
};
export default MaskedInput;
