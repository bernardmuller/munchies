import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/TextField';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface ITextField {
  label: string;
  error?: boolean;
  defaultValue?: string;
  helperText?: string;
  small?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  onChange: () => void;
}

const TextField: React.FC<ITextField> = ({
  label,
  helperText,
  error,
  defaultValue,
  small,
  required,
  fullWidth,
  onChange,
}) => {
  if (!label) throw new Error(`TextField requires a label`);
  return (
    <ThemeProvider theme={theme}>
      <Input
        id="outlined-basic"
        label={label}
        variant="outlined"
        error={error}
        defaultValue={defaultValue}
        helperText={helperText}
        size={small ? 'small' : 'medium'}
        required={required}
        fullWidth={fullWidth}
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default TextField;
