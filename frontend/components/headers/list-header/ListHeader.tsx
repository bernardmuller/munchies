'use client';

import UtilityButton from '../../buttons/utility-button/UtilityButton';

type TButtonVariant =
  | 'save'
  | 'delete'
  | 'edit'
  | 'share'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowLeft'
  | 'arrowRight'
  | 'close'
  | 'menu'
  | 'plus'
  | 'back';

export interface IListHeader {
  loading?: boolean;
  heading: string;
  onButtonClick?: () => void;
  buttonVariant?: TButtonVariant;
  theme: 'light' | 'dark';
}

const ListHeader = ({ heading, onButtonClick, buttonVariant, theme }: IListHeader) => {
  if (!heading) throw new Error('Header needs heading');
  return (
    <div className="flex items-center w-full justify-between z-20 pt-12 pb-12">
      <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} prose prose-2xl`}>
        {heading}
      </h2>
      {onButtonClick && buttonVariant && (
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={buttonVariant}
            onClick={() => {
              onButtonClick();
            }}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default ListHeader;
