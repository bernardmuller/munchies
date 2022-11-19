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
  onButtonClick: () => void;
  buttonVariant: TButtonVariant;
}

const ListHeader = ({ heading, onButtonClick, buttonVariant }: IListHeader) => {
  if (!heading) throw new Error('Header needs heading');

  return (
    <div className="h-16 flex items-center w-full justify-between z-10 bg-secondary_d px-2">
      {heading && <h2 className="text-white prose prose-2xl">{heading}</h2>}
      <div className="flex items-center justify-center w-14">
        <UtilityButton
          type="button"
          variant={buttonVariant}
          onClick={() => {
            onButtonClick();
          }}
        />
      </div>
    </div>
  );
};

export default ListHeader;
