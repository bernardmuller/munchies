import { useQueryClient } from '@tanstack/react-query';
import UtilityButton from 'components/buttons/utility-button/UtilityButton';
import { P } from 'components/typography';
import { useAddIngredientToMeal, useRemoveIngredientFromMeal } from 'hooks/ingredientsHooks';
import { debounce } from 'lodash';
import { fetchIngredients } from 'pages/api/ingredients';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import { FaUtensils } from 'react-icons/fa';

import react from 'react';

const DeleteWrapper = ({
  children,
  handleDelete,
}: //   onSuccess,
//   onCancel,
{
  children: any;
  handleDelete: () => void;
  //   onSuccess: () => void;
  //   onCancel: () => void;
}) => {
  return (
    <SwipeToDelete
      onDelete={handleDelete}
      height={80}
      transitionDuration={250}
      deleteWidth={75}
      deleteColor="rgba(252, 58, 48, 0.5)"
      deleteText="Delete"
      id="swiper-1"
      className="my-swiper rounded-lg"
      onDeleteConfirm={(onSuccess: any, onCancel: any) => {
        // not default - default is null
        if (window.confirm('Do you really want to delete this item ?')) {
          onSuccess();
        } else {
          onCancel();
        }
      }}
    >
      {children}
    </SwipeToDelete>
  );
};

export const Ingredient = ({ ingredient, mealId }: { ingredient: any; mealId: string }) => {
  const data = useRemoveIngredientFromMeal({ ingredientId: ingredient?.id, mealId: mealId });
  return (
    <DeleteWrapper handleDelete={() => alert('delete ingredient')}>
      <div className="flex justify-between min-h-[4rem] px-4 py-3 bg-secondary_400 rounded-lg items-center">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 min-w-14 bg-white rounded-lg flex items-center justify-center">
            <FaUtensils size={25} />
          </div>
          <P className=" m-0 text-secondary_800 text-md font-medium text-[1rem]">
            {ingredient.name}
          </P>
        </div>
        <P className="text-secondary_500 font-light text-sm m-0">200g</P>
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
