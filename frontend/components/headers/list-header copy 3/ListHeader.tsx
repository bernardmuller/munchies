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
  onRightButtonClick?: () => void;
  onLeftButtonClick?: () => void;
  rightButton?: boolean;
  leftButton?: boolean;
  leftButtonVariant?: TButtonVariant;
  rightButtonVariant?: TButtonVariant;
}

const ListHeader = ({
  heading,
  onRightButtonClick,
  onLeftButtonClick,
  rightButton,
  rightButtonVariant,
  leftButton,
  leftButtonVariant,
}: IListHeader) => {
  if ((leftButton && !leftButtonVariant) || (leftButtonVariant && !leftButton))
    throw new Error('Left button needs variant');
  if ((rightButton && !rightButtonVariant) || (!rightButton && rightButtonVariant))
    throw new Error('Right button needs variant');
  return (
    <div className="h-16 flex items-center w-full justify-between z-10 bg-secondary_d px-2">
      {leftButton && onLeftButtonClick && leftButtonVariant && (
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={leftButtonVariant}
            onClick={() => {
              onLeftButtonClick();
            }}
          />
        </div>
      )}
      {heading && <h2 className="text-white">{heading}</h2>}
      <div className="flex items-center justify-center w-14">
        {rightButton && onRightButtonClick && rightButtonVariant && (
          <UtilityButton
            type="button"
            variant={rightButtonVariant}
            onClick={() => {
              onRightButtonClick();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ListHeader;
