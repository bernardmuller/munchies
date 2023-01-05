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
  heading?: string;
  onLeftButtonClick: () => void;
  leftButtonVariant: TButtonVariant;
  theme: 'light' | 'dark';
}

const DetailHeader = ({ heading, onLeftButtonClick, leftButtonVariant, theme }: IDetailHeader) => {
  return (
    <div className="flex items-center w-full z-10 pt-8 pb-8">
      {/* <div className="flex"> */}
      {/* <div className="flex items-center justify-center w-14"> */}
      <UtilityButton
        type="button"
        variant={leftButtonVariant}
        onClick={() => {
          onLeftButtonClick();
        }}
        theme={theme}
      />
      {/* </div> */}
      {/* </div> */}
    </div>
    // <div className="z-20">
    //   <h2 className="text-white prose prose-2xl">test</h2>
    // </div>
  );
};

export default DetailHeader;
