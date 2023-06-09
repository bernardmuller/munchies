import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useMealsData } from "../../hooks/mealsHooks";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Recipes({ navigation }: { navigation: any }) {
	const { data, isLoading, isError, isRefetching, refetch } = useMealsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<SafeAreaView>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				height="100%"
				mt={2}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={() => {
							refetch();
						}}
					/>
				}
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
		</SafeAreaView>
	);
}

export default Recipes;
