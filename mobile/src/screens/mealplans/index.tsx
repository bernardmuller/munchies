import {
	ActivityIndicator,
	Button,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import * as React from "react";
import { useMenusData } from "../../hooks/menusHooks";
import { View } from "../../components/common";
import {
	ChevronRightIcon,
	FlatList,
	ScrollView,
	Stack,
	Text,
} from "native-base";
import ListItem from "../../components/common/ListItem";

function Mealplans({ navigation }: { navigation: any }): JSX.Element {
	const { data, isLoading, refetch, isRefetching } = useMenusData();

	console.log(data);
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<ScrollView
			mt={2}
			refreshControl={
				<RefreshControl refreshing={isRefetching} onRefresh={refetch} />
			}
		>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
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
		</ScrollView>
	);
}

export default Mealplans;
