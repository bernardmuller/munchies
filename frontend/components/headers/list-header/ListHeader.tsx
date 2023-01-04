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
}

const ListHeader = ({ heading, onButtonClick, buttonVariant }: IListHeader) => {
  if (!heading) throw new Error('Header needs heading');

  return (
    <div className="flex items-center w-full justify-between z-10 pt-8 pb-6">
      <h2 className="text-black prose prose-2xl">{heading}</h2>
      {onButtonClick && buttonVariant && (
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={buttonVariant}
            onClick={() => {
              onButtonClick();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ListHeader;
