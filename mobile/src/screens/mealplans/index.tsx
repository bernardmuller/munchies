import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { useMenusData } from "../../hooks/menusHooks";
import { View } from "../../components/common";

function Mealplans({ navigation }: { navigation: any }): JSX.Element {
	const { data, isLoading } = useMenusData();

	console.log(data);
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
