import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useIngredientsData } from "../../hooks/ingredientsHooks";
import { Box, FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Ingredients({ navigation }: { navigation: any }) {
	const { data, refetch } = useIngredientsData();

	return (
		<SafeAreaView>
			<FlatList
				pt={1}
				height="100%"
				refreshControl={
					<RefreshControl
						refreshing={false}
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
				mb={16}
			/>
		</SafeAreaView>
	);
}

export default Ingredients;
