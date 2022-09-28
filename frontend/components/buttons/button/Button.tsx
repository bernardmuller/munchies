export interface IButton {
  type: 'button' | 'submit';
  label: string;
  onClick?: () => any;
  secondary?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<IButton> = ({ type, label, onClick, secondary, disabled, isLoading }) => {
  if (!label) {
    throw new Error('Button required label.');
  }

  return (
    <button
      id="btn"
      type={type}
      onClick={onClick && onClick}
      className={` min-w-[10rem] h-12 px-6 text-white rounded-md overflow-hidden ${
        disabled
          ? 'bg-stone-400 text-stone-500 '
          : secondary
          ? ' outline-slate-50 border-2 active:bg-stone-600'
          : 'bg-primary shadow-idle transition-all hover:shadow-primary hover:bg-primary_l active:bg-primary_d active:shadow-idle active:scale-95'
      }`}
    >
      {isLoading ? 'loading...' : label}
    </button>
  );
};

export default Button;
