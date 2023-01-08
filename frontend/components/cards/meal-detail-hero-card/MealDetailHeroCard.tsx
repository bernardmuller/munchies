import Image from 'next/image';

import Badge from 'components/chips/badge/Badge';
import { H3, P } from 'components/typography';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import { TextField } from '@mui/material';
import { useUpdateMeal } from 'hooks/mealsHooks';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { setProjectAnnotations } from '@storybook/react';
import { Toast } from 'components/alerts/toast-alert/Toast';

export interface IHeroCard {
  heading: string;
  onClick: () => void;
  data: {
    name?: string;
    image?: string;
    author?: string;
    authorImage?: string;
    description?: string;
  };
  variant?: 'menu' | 'recipe';
  ingredients?: number;
  cookTimes?: number;
  minutes?: number;
  mealId: string;
}

const createComponentTheme = (theme: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode: theme,
    },
  });
};

const MealName = ({ name, mealId }: { name: string; mealId: string }) => {
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const updateMeal = useUpdateMeal();
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(false);

  const updateMealName = async () => {
    updateMeal.mutate(
      { id: mealId, data: { name: newName } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([`meal-${mealId}`]);
          setEdit(false);
          // TODI: add toast
          setToast(true);
        },
      },
    );
    setEdit(false);
    setNewName(name);
  };

  if (edit) {
    return (
      <Form name="mealName" onSubmit={updateMealName} className="w-full flex pb-4">
        <ThemeProvider theme={createComponentTheme('dark')}>
          <TextField
            name="name"
            label="Meal Name"
            autoFocus
            value={newName}
            onChange={(e: any) => setNewName(e.target.value)}
            placeholder="eg. 123g"
            type="text"
            variant="standard"
            className="w-full"
            fullWidth
            // onBlur={() => {
            //   setEdit(false);
            //   setNewName(name);
            // }}
          />
          <UtilityButton type="submit" variant="save" theme="dark" />
        </ThemeProvider>
      </Form>
    );
  }

  return (
    <button onClick={() => setEdit(true)}>
      <H3 className="text-2xl leading-7 text-white h-16 text-left">{name}</H3>
    </button>
  );
};

const MealHeroCard: React.FC<IHeroCard> = ({
  heading,
  onClick,
  data,
  variant,
  ingredients,
  cookTimes,
  minutes,
  mealId,
}) => {
  return (
    <div className=" flex flex-col gap-3 z-10">
      <div className="grid gap-3">
        <MealName mealId={mealId} name={heading} />
        <P className=" text-[12px] text-slate-400">
          {minutes && `${minutes} minutes | `}{' '}
          {ingredients && `${ingredients} ingredient ${ingredients > 1 ? 's' : ''}`}
          {cookTimes && ` | ${cookTimes} times cooked`}
        </P>
      </div>
      <div className="w-full relative h-80  bg-slate-400 rounded-3xl overflow-clip">
        <div className="w-full h-full object-cover  rounded-3xl">
          <Image
            src={
              data?.image ||
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
            }
            alt="not found"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent to-secondary_900 via-transparent" />
      </div>
      <div className="relative -top-8 w-full flex justify-center">
        {/* <div className="flex justify-center gap-3 w-full">
          {['tag', 'tag', 'tag', 'tag', 'tag', 'tag']
            .map(tag => <Badge title={tag} size="lg" />)
            .slice(0, 3)}
        </div> */}
      </div>
    </div>
  );
};

export default MealHeroCard;
