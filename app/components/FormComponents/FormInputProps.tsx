export interface FormInputProps {
  name?: string;
  control?: any;
  label?: string;
  placeholder?: string;
  setValue?: any;
  type?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  id?: string;
  ref?: any;
  required?: true;
  autoCapitalize?: string;
  autoCorrect?: string;
  className?: string;
}
