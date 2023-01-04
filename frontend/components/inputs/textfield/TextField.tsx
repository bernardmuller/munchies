import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/TextField';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const theme = createTheme({
  palette: {
    mode: 'light',
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
  onChange?: any;
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
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!label) throw new Error(`TextField requires a label`);
  if (type === 'password') {
    return (
      <ThemeProvider theme={theme}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            {...register(name)}
            endAdornment={
              <InputAdornment position="end">
                <div className="pr-1">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <IoEyeOffOutline size={30} /> : <IoEyeOutline size={30} />}
                  </IconButton>
                </div>
              </InputAdornment>
            }
            label="Password"
            onChange={onChange}
          />
        </FormControl>
      </ThemeProvider>
    );
  }
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
        onChange={onChange}
        {...register(name)}
        {...rest}
      />
    </ThemeProvider>
  );
};

export default TextField;
