import { H3, P } from '../../typography';
import Badge from '../../chips/badge/Badge';
import { InfoWidget } from '../info-widget/InfoWidget';

const UserInfoWidget = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <div className="h-[8rem] w-[8rem] flex flex-col items-center overflow-hidden rounded-full bg-secondary_400"></div>
        <H3 className="font-bold text-2xl mt-4">Name Surname</H3>
        <P className="font-light text-lg">me@email.com</P>
        <Badge title="Admin" size="sm" />
      </div>
      <div className="px-[10%]">
        <InfoWidget />
      </div>
    </div>
  );
};

export default UserInfoWidget;
