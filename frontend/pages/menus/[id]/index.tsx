import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import PrimaryLayout from 'components/layouts/primary/PrimaryLayout';
import MainUtilityButton from 'components/buttons/main-util-button/MainUtilityButton';
import NavBar from 'components/navbar/navbar/NavBar';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { GroceryList } from 'components/menu/grocerylist';
import MealCard from 'components/cards/meal-card/MealCard';

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
  return (
    <div>
      <div className="w-full h-full px-4 py-2">
        <div className="w-full p-4 rounded-md">
          <Name name={'Test'} onRename={() => {}} />

          <p className="text-gray-300 m-0">Creator: {'username'}</p>
        </div>
        <div className="flex items-center justify-between px-4 mx-4">
          <h4>Meals</h4>
        </div>

        <div className="flex flex-col overflow-x-scroll px-2 mb-4">
          <div className="flex gap-4 pb-4">
            {[1, 3, 4, 5].map(meal => (
              <MealCard
                title={'Meal Name'}
                seasons={['winter']}
                key={meal}
                onClick={() => {}}
                ingredients={3}
                width={'7rem'}
                active={false}
              />
            ))}
          </div>
        </div>

        <div className="w-full p-4 rounded-md" style={{ marginBottom: '40rem' }}>
          <GroceryList
            mealItems={[]}
            extraItems={[]}
            menuId={''}
            onReload={() => {}}
            totalItems={10}
          />
        </div>
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
