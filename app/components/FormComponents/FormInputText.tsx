import React from "react";
import { FormInputProps } from "./FormInputProps"
import { styles } from "./FormInputText.css";

export const FormInputText = ({
  name,
  label,
  ...rest
}: FormInputProps) => {
  const s = styles()

  return (
    <>
      <div className={s.inputContainer}>
        <label htmlFor={name}>{label}</label>
        <input className={s.TextField} id={name} {...rest} type="email" />
      </div>
    </>
    )
}

export default FormInputText