import Button from 'components/buttons/button/Button';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import TextField from 'components/inputs/textfield/TextField';
import { useAddIngredient, useIngredientsData } from 'hooks/ingredientsHooks';
import { useState } from 'react';
import PageHeader from '../components/headers/page-header/PageHeader';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NavBar from '../components/navbar/navbar/NavBar';
import { NextPageWithLayout } from './page';

interface IIngredient {
  id: string;
  name: string;
  createdAt: string;
  mealId: string;
}

const Ingredients: NextPageWithLayout = () => {
  const [add, setAdd] = useState(false);
  const { data, isLoading } = useIngredientsData();
  const addIngredient = useAddIngredient();

  const onSubmit = (data: { name: string }) => {
    addIngredient.mutate(data as any);
    setAdd(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className=" grid grid-cols-1 gap-4 overflow-scroll pb-28">
        {data?.map((ingredient: IIngredient) => (
          <p key={ingredient.id}>{ingredient.name}</p>
        ))}
        {/* {!add ? (
          <Button secondary type="button" label="+ Add Ingredient" onClick={() => setAdd(true)} />
        ) : (
          <Form onSubmit={onSubmit} className="flex w-full justify-between items-center gap-2 ">
            <TextField
              name="name"
              label="New Ingredient Name"
              type="text"
              fullWidth
              placeholder="eg. Tomatoes"
            />
            <UtilityButton variant="save" type="submit" />
            <UtilityButton variant="close" type="button" onClick={() => setAdd(false)} />
          </Form>
        )} */}
      </div>
    </section>
  );
};

export default Ingredients;

Ingredients.getLayout = page => {
  return (
    <PrimaryLayout>
      <PageHeader heading="Ingredients" />
      <div className="px-6">{page}</div>
      <NavBar />
    </PrimaryLayout>
  );
};
