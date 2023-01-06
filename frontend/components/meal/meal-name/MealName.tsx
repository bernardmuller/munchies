import { useQueryClient } from '@tanstack/react-query';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { useUpdateMeal } from 'hooks/mealsHooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const MealName = ({ meal }: { meal: any }) => {
  const { register, handleSubmit } = useForm();
  const [edit, setEdit] = useState(false);
  const [mealName, setMealName] = useState(meal?.name);

  const updateMeal = useUpdateMeal();
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    updateMeal.mutate(
      { id: meal?.id, data: data },
      {
        onSuccess: () => {
          console.log('success');
          setEdit(false);
          return queryClient.invalidateQueries([`meal-${meal?.id}`]);
        },
      },
    );
  };

  return (
    <div className="flex items-center">
      {!edit ? (
        <h2 className="mt-6 mb-2" onClick={() => setEdit(true)}>
          {meal?.name}
        </h2>
      ) : (
        <form className="flex w-full justify-between pt-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Meal name"
            value={mealName}
            className="input w-full text-black"
            {...register('name', {
              onChange: e => {
                setMealName(e.target.value);
              },
            })}
          />
          <div className="flex">
            <UtilityButton type="submit" variant="save" onClick={() => {}} theme="light" />
            <UtilityButton
              type="button"
              variant="close"
              onClick={() => setEdit(false)}
              theme="light"
            />
          </div>
        </form>
      )}
    </div>
  );
};
