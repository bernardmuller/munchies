import { useQueryClient } from '@tanstack/react-query';

import { P } from 'components/typography';
import { useAddIngredientToMeal, useRemoveIngredientFromMeal } from 'hooks/ingredientsHooks';
import { debounce } from 'lodash';
import { fetchIngredients } from 'pages/api/ingredients';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

import { FaRegistered, FaUtensils } from 'react-icons/fa';
import TextField from 'components/inputs/textfield/TextField';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import DeleteWrapper from 'components/containers/delete-wrapper/DeleteWrapper';

// const Quantity = ({
//   ingredientId,
//   mealId,
//   quantity,
// }: {
//   ingredientId: string;
//   mealId: string;
//   quantity: string;
// }) => {
//   const [edit, setEdit] = useState(false);
//   // const quantity = useIngredientQuantity();
//   const [quantityValue, setQuantityValue] = useState(quantity);
//   if (edit) {
//     return (
//       <Form onSubmit={() => {}} className="flex flex-col w-24">
//         <TextField
//           name="quantity"
//           label="Quantity"
//           autoFocus
//           value={quantityValue}
//           onChange={(e: any) => setQuantityValue(e)}
//           placeholder="eg. 123g"
//           type="text"
//           theme="light"
//           onInputBlur={() => {
//             alert('blurrrrrr2222222');
//           }}
//           // register={'name'}
//         />
//         {/* <input
//           className="input"
//           onBlur={() => {
//             alert('lkwjdvnwd');
//           }}
//         /> */}
//         {/* <input /> */}
//       </Form>
//     );
//   }

//   return (
//     <button className="text-secondary_500 font-light text-sm m-0" onClick={() => setEdit(true)}>
//       {quantity}
//     </button>
//   );
// };

export const Ingredient = ({ ingredient, mealId }: { ingredient: any; mealId: string }) => {
  const queryClient = useQueryClient();
  const removeIngredient = useRemoveIngredientFromMeal();
  return (
    <DeleteWrapper
      handleDelete={() => {
        removeIngredient.mutate(
          {
            ingredientId: ingredient?.id,
            mealId: mealId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([`meal-${mealId}`]);
            },
          },
        );
      }}
    >
      <div className="flex justify-between min-h-[4rem] px-4 py-3 bg-secondary_200 rounded-lg items-center">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 min-w-14 bg-white rounded-lg flex items-center justify-center">
            <FaUtensils size={25} />
          </div>
          <P className=" m-0 text-secondary_800 text-md font-medium text-[1rem]">
            {ingredient.ingredient.name}
          </P>
        </div>
        {/* <Quantity ingredientId={ingredient.id} mealId={mealId} quantity={ingredient.quantity} /> */}
      </div>
    </DeleteWrapper>
  );
};

export const AddIngredient = ({
  meal,
  onLoading,
}: {
  meal: any;
  onLoading: (arg0: boolean) => void;
}) => {
  const [add, setAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const addIngredient = useAddIngredientToMeal();
  const queryClient = useQueryClient();

  const getIngredients = async () => {
    setLoading(true);
    onLoading(true);
    const ingredients = await fetchIngredients({
      searchTerm: searchTerm.toLowerCase() || '',
      page: '1',
    });

    let dropDownOptions = ingredients?.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    setLoading(false);
    onLoading(false);
    return dropDownOptions;
  };

  useEffect(() => {
    getIngredients().then(res => setItems(res));
  }, [searchTerm]);

  const updateSearchTerm = (inputValue: string) => setSearchTerm(inputValue);

  const debounceOnChange = debounce(updateSearchTerm, 300);

  if (!add)
    return (
      <div className="flex justify-center px-4 py-3 bg-secondary_400/40 rounded-lg items-center">
        <button className="text-secondary_500" onClick={() => setAdd((prev: boolean) => !prev)}>
          Add Ingredient +
        </button>
      </div>
    );

  return (
    <div className="flex justify-center px-4 py-3 bg-secondary_400/40 rounded-lg items-center">
      <form className="flex w-full items-center justify-between gap-1">
        <div className="flex w-full">
          <div className="w-full">
            <ReactSelect
              name="ingredient"
              placeholder="Search ingredients..."
              options={items}
              isLoading={loading}
              onInputChange={val => debounceOnChange(val)}
              value={searchTerm}
              onBlur={() => setAdd(false)}
              autoFocus
              onChange={(val: any) => {
                if (val) {
                  onLoading(true);
                  addIngredient.mutate(
                    {
                      mealId: meal.id,
                      ingredientId: val.value,
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries([`meal-${meal.id}`]);
                      },
                    },
                  );
                }
                setAdd(false);
                setSearchTerm('');
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
