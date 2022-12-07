import Link from 'next/link';
import MealCard, { IMealCard } from 'components/cards/meal-card/MealCard';
import { H3, P } from 'components/typography';

export interface Meal {
  image?: string;
  title: string;
  seasons: any;
  ingredients: any;
}
export interface IHeroCard {
  heading: string;
  meals: Meal[];
  onMealClicked: () => void;
}

const BasicMealSlider: React.FC<IHeroCard> = ({ heading, meals, onMealClicked }) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between">
        <H3 className="text-xl text-slate-50">{heading}</H3>
        <Link href="#" className="text-primary_400 text-md font-light">
          View all
        </Link>
      </div>
      <div className="h-auto flex gap-4 overflow-x-scroll pb-4">
        {meals && meals.length > 0 && (
          <>
            {meals.map((meal: Meal, index: number) => (
              <MealCard
                active={false}
                title={meal.title}
                image={
                  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80'
                }
                seasons={meal.seasons}
                ingredients={meal?.ingredients?.length}
                onClick={onMealClicked}
                key={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BasicMealSlider;
