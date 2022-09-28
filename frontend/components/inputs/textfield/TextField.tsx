import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/TextField';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface ITextField {
  name: string;
  label: string;
  error?: boolean;
  defaultValue?: string;
  helperText?: string;
  small?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  type: 'text' | 'number' | 'password' | 'email';
  value?: string;
  placeholder: string;
  register?: any;
}

const TextField: React.FC<ITextField> = ({
  name,
  label,
  helperText,
  error,
  defaultValue,
  small,
  required,
  fullWidth,
  type,
  value,
  placeholder,
  register,
  ...rest
}) => {
  if (!label) throw new Error(`TextField requires a label`);
  return (
    <ThemeProvider theme={theme}>
      <Input
        name={name}
        type={type}
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        error={error}
        defaultValue={defaultValue}
        helperText={helperText}
        size={small ? 'small' : 'medium'}
        required={required}
        fullWidth={fullWidth}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
    </ThemeProvider>
  );
};

export default TextField;
