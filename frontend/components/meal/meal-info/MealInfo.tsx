import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

// import { FontSizes, colors } from 'common';
// import Multiselect from 'react-widgets/Multiselect';
import { useQueryClient } from '@tanstack/react-query';
import food from 'assets/images/food_ph.png';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { useUpdateMeal } from 'hooks/mealsHooks';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { Confirmation } from './Confirmation';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagsWrapper = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
  }
`;

const SeasonForm = styled.form`
  width: 100%;
  display: flex;
`;

const Name = ({ meal }: { meal: any }) => {
  const { register, handleSubmit } = useForm();
  const [edit, setEdit] = useState(false);
  const [mealName, setMealName] = useState(meal?.name);

  const updateMeal = useUpdateMeal();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    updateMeal.mutate(
      { id: meal?.id, data: data },
      {
        onSuccess: () => {
          console.log('success');
          setEdit(false);
          return queryClient.invalidateQueries([`meal-${meal?.id}`]);
        },
      }
    );
  };

  return (
    <Wrapper>
      {!edit ? (
        <h2 className="mt-6 mb-2" onClick={() => setEdit(true)}>
          {meal?.name}
        </h2>
      ) : (
        <form
          className="flex w-full justify-between pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Meal name"
            value={mealName}
            className="input w-full text-black"
            {...register('name', {
              onChange: (e) => {
                setMealName(e.target.value);
              },
            })}
          />
          <div className="flex">
            <UtilityButton type="submit" variant="save" onClick={() => {}} />
            <UtilityButton
              type="button"
              variant="close"
              onClick={() => setEdit(false)}
            />
          </div>
        </form>
      )}
    </Wrapper>
  );
};

const Tags = ({ tags }: { tags: any }) => {
  return (
    <div className="flex gap-3">
      {tags.map((tag: any) => (
        <span key={tag} className="badge badge-accent badge-lg">
          {tag}
        </span>
      ))}
    </div>
  );
};

const Stat = ({
  label,
  value,
  meal,
}: {
  label: string;
  value: string;
  meal: any;
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="flex flex-col text-center gap-2">
      {edit ? (
        <form className="flex items-center">
          <input
            type="number"
            className="text-black input input-sm max-w-[5rem]"
            autoFocus
          />
          <UtilityButton variant="save" type="submit" />
        </form>
      ) : (
        <span className="text-white  text-lg" onClick={() => setEdit(true)}>
          {value}
        </span>
      )}
      <span className=" text-sm">{label}</span>
    </div>
  );
};

const MealStats = ({ meal }: { meal: any }) => {
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
    <div className="flex border-slate-400 border-2 rounded-xl p-4 justify-around items-center h-28">
      {stats.map((stat) => (
        <Stat key={stat.key} label={stat.key} value={stat.value} meal={meal} />
      ))}
    </div>
  );
};

const Seasons = () => {
  const [edit, setEdit] = useState(false);
  // const token = getCookie('token');

  return (
    <div className="pt-4 pb-4">
      {!edit ? (
        <Container>
          <TagsWrapper onClick={() => setEdit(true)}>
            <Tags tags={['winter', 'summer']} />
          </TagsWrapper>
        </Container>
      ) : (
        <SeasonForm>form</SeasonForm>
      )}
    </div>
  );
};

export const MealInfo = ({ meal }: { meal: any }) => {
  console.log(meal);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-64 overflow-hidden rounded-xl relative bg-slate-300 flex items-center justify-center p-32 self-center">
        {meal?.image ? (
          <Image
            src={meal.image}
            layout="fill"
            objectFit="cover"
            alt="meal image"
          />
        ) : (
          <Placeholder>
            <Image src={food} alt="meal" />
          </Placeholder>
        )}
      </div>

      <div className="prose flex flex-col gap-2">
        <Name meal={meal} />

        <span>Creator: User Name</span>

        <MealStats meal={meal} />

        <Seasons />
      </div>
    </div>
  );
};
