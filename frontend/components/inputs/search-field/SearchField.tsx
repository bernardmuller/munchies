import { ThemeProvider } from '@mui/material/styles';
import { colors } from 'shared/colors';
import { Icon } from 'shared/Icons';

export interface ISearchField {
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
  placeholder: string;
  register?: any;
}

const SearchField: React.FC<ISearchField> = ({
  name,
  label,
  helperText,
  error,
  required,
  fullWidth,
  value,
  placeholder,
  register,
  ...rest
}) => {
  return (
    <div className="form-control w-full border-red-500">
      <div className="input-group w-full">
        <button className="btn btn-square bg-secondary_200 border-none">
          <Icon variant="explore" size={25} color={colors.secondary_700} />
        </button>
        <input
          type="text"
          placeholder={placeholder || 'Search...'}
          className="input border-none bg-secondary_200 placeholder-secondary_600 text-secondary_700 w-full"
          value={value}
        />
      </div>
    </div>
  );
};

export default SearchField;
