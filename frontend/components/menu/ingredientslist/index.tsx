import React, { useEffect, useState } from 'react';
import { Icon } from 'shared/Icons';

const Item = ({ item }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = async itemData => {
    setChecked(prev => !prev);
    if (itemData.check) {
      // unCheckItem(item._id, token);
    } else {
      // checkItem(itemData._id, token);
    }
  };

  useEffect(() => {
    if (item.check) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    return () => {};
  }, []);

  return (
    <div
      className="outline-none border-none bg-none w-full h-10 py-1 px-4 flex items-center"
      onClick={() => {}}
    >
      {checked ? <Icon variant="arrowRight" size={22} /> : <Icon variant="arrowLeft" size={22} />}
      <div className={`${checked ? 'text-gray-700' : 'text-gray-300'}`}>{item.ingredient.name}</div>
    </div>
  );
};

export const IngredientsList = ({ mealItems, name }: { mealItems: any; name: string }) => {
  return (
    <div className="grid w-full">
      <p className="text-black border-b-2 border-gray-300 py-2">{name}</p>
      <div className="w-full flex m-0 flex-col p-0 gap-2">
        {mealItems.length < 0 ? (
          <>
            {[1, 2, 3].map((item: any) => (
              <Item key={item + Math.random() * 2} item={{ ingredient: { name: 'test' } }} />
            ))}
          </>
        ) : (
          <div className="m-4 text-gray-300">No meal items yet. First add meals to the menu.</div>
        )}
      </div>
    </div>
  );
};
