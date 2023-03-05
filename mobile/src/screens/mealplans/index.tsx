import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { useMenusData } from "../../hooks/menusHooks";

function Mealplans({ navigation }: { navigation: any }) {
  const { data, isLoading, error, isError } = useMenusData();

  console.log(data)
  if (!data && isLoading) return <ActivityIndicator size={30} />;

  return (
    <View className="grid gap-1 mt-1">
      {isLoading && <ActivityIndicator size={30} />}

      {data?.length > 0 ? (
        data?.map((mealplan: any) => (
          <View
            className="p-2 w-full rounded-sm bg-white shadow-sm"
            key={mealplan.id}
          >
            <Button
              title={mealplan.name}
              onPress={() =>
                navigation.push("MealplanDetail", {
                  mealplanId: mealplan.id,
                })
              }
            />
          </View>
        ))
      ) : (
        <Text>No meals</Text>
      )}
    </View>
  );
}

export default Mealplans;
