import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useGrocerylistsData } from "../../hooks/grocerylistHooks";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Grocerylists({ navigation }: { navigation: any }) {
	const { data, isLoading, refetch, isRefetching } = useGrocerylistsData();
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<SafeAreaView>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={() => {
							refetch();
						}}
					/>
				}
				mt={2}
				data={data}
				height="100%"
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() => {
							navigation.push("GrocerylistDetail", {
								grocerylistId: item.id,
							});
						}}
						label={`${item?.menu?.name}`}
						key={`groverylist-${item.menu?.name}`}
					/>
				)}
				mb={10}
			/>
		</SafeAreaView>
	);
}

export default Grocerylists;
