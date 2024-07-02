import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useIngredientsData } from "../../hooks/ingredientsHooks";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Ingredients({ navigation }: { navigation: any }) {
	const { data, isRefetching, refetch } = useIngredientsData();

	if (!data) return <ActivityIndicator size={30} />;
	return (
		<SafeAreaView>
			<FlatList
				pt={1}
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
