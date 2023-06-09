import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useIngredientsData } from "../../hooks/ingredientsHooks";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Ingredients({ navigation }: { navigation: any }) {
	const { data, isLoading, isRefetching, refetch } = useIngredientsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<SafeAreaView>
			{isLoading && <ActivityIndicator size={30} />}
			<FlatList
				mt={2}
				height="100%"
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={() => {
							refetch();
						}}
					/>
				}
				data={data}
				renderItem={(item: any) => (
					<ListItem
						onPress={() =>
							navigation.navigate("IngredientDetail", {
								ingredientId: item.item.id,
							})
						}
						label={item.item.name}
						key={item.item.id}
					/>
				)}
				mb={10}
			/>
		</SafeAreaView>
	);
}

export default Ingredients;
