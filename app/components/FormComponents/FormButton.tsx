import { styles } from "./formButton.css";
import React from "react";
import { FormInputProps } from "./FormInputProps";

export const FormButton = ({ onClick, children }: FormInputProps) => {
  const s = styles();

  return (
    <>
      <button onClick={onClick} className={s.styleButton}>
        {children}
      </button>
    </>
  );
};

export default FormButton;
