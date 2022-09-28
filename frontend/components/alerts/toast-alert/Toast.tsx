import { Alert } from '@mui/material';

interface IToast {
  variant: 'outlined' | 'filled' | 'standard';
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export const Toast: React.FC<IToast> = ({
  variant = 'standard',
  severity = 'info',
  message = 'This is a toast',
}) => {
  return (
    <div className="mb-6 px-4">
      <Alert variant={variant} severity={severity}>
        {message}
      </Alert>
    </div>
  );
};
