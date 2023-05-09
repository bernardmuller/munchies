import { Text, ActivityIndicator, Button, RefreshControl } from "react-native";
import * as React from "react";
import { useMealsData } from "../../hooks/mealsHooks";
import { FlatList, ScrollView, useToast } from "native-base";
import { Link } from "@react-navigation/native";
import { View } from "../../components/common/View";
import ListItem from "../../components/common/ListItem";

function Recipes({ navigation }: { navigation: any }) {
	const { data, isLoading, isError, isRefetching, refetch } = useMealsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<ScrollView
			mt={2}
			refreshControl={
				<RefreshControl
					refreshing={isRefetching}
					onRefresh={() => {
						refetch();
					}}
				/>
			}
		>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() =>
							navigation.push("RecipeDetail", {
								recipeId: item.id,
							})
						}
						label={`${item?.name}`}
						key={`recipe-${item.name}`}
					/>
				)}
				mb={10}
			/>
		</ScrollView>
	);
}

export default Recipes;
