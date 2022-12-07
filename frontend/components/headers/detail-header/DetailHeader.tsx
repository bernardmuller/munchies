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
  onLeftButtonClick: () => void;
  leftButtonVariant: TButtonVariant;
}

const DetailHeader = ({ heading, onLeftButtonClick, leftButtonVariant }: IDetailHeader) => {
  if (!heading) throw new Error('Missing heading on Detail header');
  return (
    <div className="flex items-center  w-full z-10 pt-4">
      <div className="flex">
        <div className="flex items-center justify-center w-14">
          <UtilityButton
            type="button"
            variant={leftButtonVariant}
            onClick={() => {
              onLeftButtonClick();
            }}
          />
        </div>
      </div>
      <h2 className="text-white prose prose-2xl">{heading}</h2>
    </div>
  );
};

export default DetailHeader;
