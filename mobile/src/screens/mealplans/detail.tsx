import { useMenuData } from '../../hooks/menusHooks';
import { View, Text } from '../../components/common';
import { ActivityIndicator } from 'react-native';

export default function MealplanDetail({ route }: { route: any }) {
  const { mealplanId } = route.params
  const { data, isLoading, isError } = useMenuData(route.params.mealplanId)

  if (!data && isLoading) return <ActivityIndicator size={30} />;
  return (
    <View className="grid gap-1 mt-1">
      <Text>Mealplan Name: '{data.name}'</Text>
    </View>
  );
}
