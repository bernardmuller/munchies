import { useMenuData } from '../../hooks/menusHooks';
import { View, Text } from '../../components/common';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function MealplanDetail({ route }: { route: any }) {
  // const { mealplanId } = route.params
  const { data, isLoading, isError } = useMenuData(route.params.mealplanId)

  if (!data && isLoading) return <ActivityIndicator size={30} />;
  return (
    <ScrollView className='p-2'>
      <Text className="text-2xl font-bold ">{data.name}</Text>
      <Text>Created at: {data.createdAt}</Text>
      <Text className="text-lg mt-2 font-bold">Recipes:</Text>
      {data.meals.map((meal: any) => (
        <View key={meal.id} className="h-16 bg-white rounded-lg p-2 px-4 shadow my-1">
          <Text className="text-lg">{meal.name}</Text>
          <Text className="text-md text-stone-600">Ingredients: {meal.ingredients.length}</Text>
        </View>
      ))}
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}
