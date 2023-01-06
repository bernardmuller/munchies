import { useState } from 'react';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';

const Stat = ({
  label,
  value,
  meal,
  divider,
}: {
  label: string;
  value: string;
  meal: any;
  divider: boolean;
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className={`flex flex-col text-center gap-2 ${divider && 'border-r-2'} px-4`}>
      {edit ? (
        <form className="flex items-center">
          <input type="number" className="text-black input input-sm max-w-[5rem]" autoFocus />
          <UtilityButton variant="save" type="submit" theme="light" />
        </form>
      ) : (
        <span className="text-black  text-lg" onClick={() => setEdit(true)}>
          {value}
        </span>
      )}
      <span className=" text-sm text-secondary_400">{label}</span>
    </div>
  );
};

export const MealStats = ({ meal }: { meal: any }) => {
  const stats = [
    {
      key: 'Prep Time',
      value: meal?.prepTime ? `${meal?.prepTime?.toString()}` : 'N/A',
    },
    {
      key: 'Cook time',
      value: meal?.cookTime ? `${meal?.cookTime?.toString()}` : 'N/A',
    },
    {
      key: 'Ready In',
      value: meal?.readyIn ? `${meal?.readyIn?.toString()}` : 'N/A',
    },
  ];

  return (
    <div className="w-full flex px-4 justify-around items-center h-28 prose">
      {stats.map((stat, index) => (
        <Stat
          key={stat.key}
          label={stat.key}
          value={stat.value}
          meal={meal}
          divider={index === 0 || index === 1}
        />
      ))}
    </div>
  );
};
