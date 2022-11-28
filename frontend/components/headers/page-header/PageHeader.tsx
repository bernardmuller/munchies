'use client';

import Image from 'next/image';
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
  onProfileClick: () => void;
  image: string;
}

const PageHeader = ({ heading, onProfileClick, image }: IListHeader) => {
  if (!heading) throw new Error('Header needs heading');

  return (
    <div className="flex items-center w-full justify-between z-10 pt-8 pb-8">
      <h2 className="text-white prose prose-2xl">{heading}</h2>
      <div className="flex items-center justify-center w-14">
        <button onClick={onProfileClick}>
          <Image
            className=" rounded-full ring-2 ring-white"
            src={image}
            alt=""
            width={35}
            height={35}
          />
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
