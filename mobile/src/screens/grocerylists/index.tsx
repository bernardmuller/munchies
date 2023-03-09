import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { useGrocerylistsData } from "../../hooks/grocerylistHooks";

function Grocerylists({ navigation }: { navigation: any }) {
  const { data, isLoading } = useGrocerylistsData();

  console.log(data)
  if (!data && isLoading) return <ActivityIndicator size={30} />;

  return (
    <View className="grid gap-1 mt-1">
      {isLoading && <ActivityIndicator size={30} />}

      {data?.length > 0 ? (
        data?.map((list: any) => (
          <View
            className="p-2 w-full rounded-sm bg-white shadow-sm"
            key={list.id}
          >
            <Button
              title={'list: ' + list.id}
              onPress={() =>
                navigation.push("MealplanDetail", {
                  mealplanId: list.id,
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

export default Grocerylists;
