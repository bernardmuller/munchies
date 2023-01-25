import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import MainUtilityButton from 'components/buttons/main-util-button/MainUtilityButton';
import NavBar from 'components/navbar/navbar/NavBar';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { GroceryList } from 'components/menu/grocerylist';
import MealCard from 'components/cards/meal-card/MealCard';
import DetailHeader from 'components/headers/detail-header/DetailHeader';
import { useMenuData } from 'hooks/menusHooks';
import { useRouter } from 'next/router';
import Button from 'components/buttons/button/Button';

const Name = ({ name, onRename }: { name: string; onRename: () => void }) => {
  const { register, handleSubmit } = useForm();

  const [edit, setEdit] = useState(false);
  const [menuName, setMenuName] = useState(name);

  const onSubmit = data => {};

  return (
    <div className="flex items-center h-8">
      {!edit ? (
        <h2 onClick={() => setEdit(true)}>{menuName || 'menu name'}</h2>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Menu name"
            height="2.5rem"
            value={menuName}
            {...register('name', {
              onChange: e => {
                setMenuName(e.target.value);
              },
              required: 'Name field can not be empty',
            })}
          />
          <UtilityButton variant="delete" type={'button'} theme={'light'} />
          <UtilityButton variant="save" type={'button'} theme={'light'} />
        </form>
      )}
    </div>
  );
};

const MenuDetail = () => {
  const router = useRouter();
  const mealId = router.query.id;

  console.log(router);
  const { data, isFetching } = useMenuData(mealId as string);

  if (isFetching) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className="w-full">
      <DetailHeader
        onLeftButtonClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        leftButtonVariant={'back'}
        theme={'light'}
      />
      <div className="w-full  rounded-md pb-4">
        <Name name={data.name} onRename={() => {}} />
      </div>
      <div className="flex items-center justify-between py-4 m-0">
        <h3 className="m-0 text-xl">Meals</h3>

        <Button
          type="button"
          label="Meals list"
          onClick={() => router.push(`/menus/${mealId}/mealslist`)}
        />
      </div>

      <div className="flex flex-col overflow-x-scroll ">
        <div className="flex gap-4 pb-4">
          {/* */}
          {data.meals?.map((meal: any) => (
            <MealCard
              title={meal.name}
              seasons={['winter']}
              key={meal}
              onClick={() => {}}
              ingredients={3}
              active={false}
            />
          ))}
          {!data.meals?.length && (
            <p className="text-sm text-secondary_200">No meals in this menu yet.</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <GroceryList
          mealItems={[]}
          extraItems={[]}
          menuId={''}
          onReload={() => {}}
          totalItems={10}
        />
      </div>
    </div>
  );
};

MenuDetail.getLayout = (page: any) => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
      <MainUtilityButton />
      <NavBar />
    </PrimaryLayout>
  );
};

export default MenuDetail;
