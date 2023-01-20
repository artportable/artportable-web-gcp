import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { FormInputProps } from "./FormInputProps";
import { styles } from "./FormInputText.css";

export const FormInputText = ({
  name,
  control,
  label,
  placeholder,
}: FormInputProps) => {
  const s = styles();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          type="email"
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          placeholder={placeholder}
          label={label}
          variant="outlined"
          className={s.TextField}
          required
        />
      )}
    />
  );
};

/*



<FormInputText
                type="email"
                name="textValue"
                control={control}
                placeholder="info@artportable.com"
              />

*/
