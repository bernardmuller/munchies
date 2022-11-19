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

export interface IDetailHeader {
  loading?: boolean;
  heading: string;
  onRightButtonClick: () => void;
  onLeftButtonClick: () => void;
  rightButton: boolean;
  leftButton: boolean;
  leftButtonVariant: TButtonVariant;
  rightButtonVariant: TButtonVariant;
}

const DetailHeader = ({
  heading,
  onRightButtonClick,
  onLeftButtonClick,

  rightButtonVariant,

  leftButtonVariant,
}: IDetailHeader) => {
  if (!heading) throw new Error('Missing heading on Detail header');
  return (
    <div className="h-20 flex flex-col gap-4 w-full justify-between z-10  px-2">
      <div className="w-full flex justify-between">
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={leftButtonVariant}
            onClick={() => {
              onLeftButtonClick();
            }}
          />
        </div>
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={rightButtonVariant}
            onClick={() => {
              onRightButtonClick();
            }}
          />
        </div>
      </div>
      <h2 className="text-white pl-4 prose prose-2xl">{heading}</h2>
    </div>
  );
};

export default DetailHeader;
