import { H3 } from 'components/typography';
import { Icon } from 'shared/Icons';

export interface ISettingsButton {
  label: string;
  onClick?: () => any;
}

const SettingsButton: React.FC<ISettingsButton> = ({ label, onClick }) => {
  if (!label) {
    throw new Error('Settings button requires a label.');
  }

  return (
    <button
      id="btn"
      onClick={onClick && onClick}
      className="bg-secondary_400 rounded-lg h-20 text-secondary_50 text-xl flex justify-between items-center px-4"
    >
      <H3>{label}</H3>
      <Icon variant="arrowRight" size={35} />
    </button>
  );
};

export default SettingsButton;
