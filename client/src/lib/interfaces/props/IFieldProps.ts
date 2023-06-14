export interface IFieldProps {
  controlId: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isPasswordField: boolean;
  isInvalid: boolean;
  errorMessage: string | undefined;
  passwordToggleIcon: JSX.Element | null;
}
