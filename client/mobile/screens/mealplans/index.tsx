import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { useMenusData } from "../../hooks/menusHooks";
import { ChevronRightIcon, FlatList, Stack, Text } from "native-base";

function Mealplans({ navigation }: { navigation: any }): JSX.Element {
	const { data, isLoading, refetch, isRefetching } = useMenusData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<SafeAreaView>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				pt={2}
				height="100%"
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={refetch}
					/>
				}
				data={data}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={() => {
							navigation.push("MealplanDetail", {
								mealplanId: item.id,
							});
						}}
					>
						<Stack
							direction="row"
							key={`mealplan-${item.id}`}
							height="20"
							bgColor="white"
							borderRadius={10}
							p={2}
							px={6}
							shadow="2"
							my={1}
							mx={2}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Stack>
								<Text fontSize="xl">{item.name}</Text>
								<Text fontSize="sm">
									{`${item?.meals?.length} meal${
										item?.meals?.length > 1 ? "s" : ""
									}`}
								</Text>
							</Stack>
							<ChevronRightIcon />
						</Stack>
					</TouchableOpacity>
				)}
				mb={10}
			/>
		</SafeAreaView>
	);
}

export default Mealplans;
