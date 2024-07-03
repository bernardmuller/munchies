import {
	ActivityIndicator,
	RefreshControl,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import {
	Box,
	Button,
	FormControl,
	Stack,
	Text,
	CheckIcon,
	FlatList,
	Divider,
	Select,
} from "native-base";
import { useState } from "react";
import { Category } from "../../constants/ingredientCategories";
import { useCheckItem, useCreateItem, useUnCheckItem } from "../../hooks/items";
import { AntDesign } from "@expo/vector-icons";
import { useNewestGrocerylist } from "../../hooks/grocerylistHooks";
import { useIngredientsData } from "src/hooks/ingredientsHooks";
import Colors from "src/constants/Colors";
import { Item } from "src/lib/http/endpoints/getAllGrocerylists";

export default function MealplanDetail({ route }: { route: any }) {
	const [newItem, setNewItem] = useState(false);
	const { data: grocerylist, isRefetching, refetch } = useNewestGrocerylist();

	const createItemMutation = useCreateItem(grocerylist?.data?.id as string);
	const ingredients = useIngredientsData();
	const checkItemMutation = useCheckItem(grocerylist?.data?.id as string);
	const unCheckItemMutation = useUnCheckItem(grocerylist?.data?.id as string);

	if (!grocerylist?.data || isRefetching)
		return <ActivityIndicator size={30} />;
	return (
		<SafeAreaView>
			<Stack p={2} height={"full"} justifyContent="space-between">
				{grocerylist?.data?.items?.length === 0 ? (
					// <Box
					// 	display="flex"
					// 	justifyContent="center"
					// 	textAlign="center"
					// >
					<Text color={"gray.500"} width="full" textAlign="center">
						No items in this grocerylist
					</Text>
				) : (
					// </Box>
					<FlatList
						data={grocerylist?.data?.items?.sort(
							(a: Item, b: Item) => {
								if (a.check && !b.check) {
									return 1;
								} else if (!a.check && b.check) {
									return -1;
								} else {
									return 1;
								}
							}
						)}
						refreshControl={
							<RefreshControl
								refreshing={isRefetching}
								onRefresh={() => {
									refetch();
								}}
							/>
						}
						renderItem={({ item }: any) => (
							<ListItem
								key={item.id}
								item={item}
								onPress={() => {
									if (item.check) {
										unCheckItemMutation.mutate(item.id);
									} else {
										checkItemMutation.mutate(item.id);
									}
								}}
							/>
						)}
					/>
				)}
				{newItem ? (
					<FormControl isInvalid mt={3}>
						<FormControl.Label>
							Add an item to your grocerylist
						</FormControl.Label>
						<Select
							accessibilityLabel="- Select Ingredient -"
							placeholder="- Select Ingredient -"
							_selectedItem={{
								bg: "teal.600",
								endIcon: <CheckIcon size={5} />,
							}}
							mt="1"
							onValueChange={(itemValue) => {
								createItemMutation.mutate({
									ingredientId: itemValue,
									grocerylistId: grocerylist?.data
										?.id as string,
								});
								setNewItem(false);
							}}
							height={16}
							fontSize="md"
						>
							{ingredients?.data.map((category: Category) => (
								<Select.Item
									key={category.id}
									label={category.name}
									value={String(category.id)}
								/>
							))}
						</Select>
					</FormControl>
				) : (
					<Box>
						<Button
							height={16}
							my={2}
							rounded="full"
							bgColor={Colors.light.CTA}
							onPress={() => setNewItem(true)}
						>
							<Text
								color="white"
								fontWeight="semibold"
								fontSize={16}
							>
								Add Item
							</Text>
						</Button>
					</Box>
				)}
			</Stack>
		</SafeAreaView>
	);
}

const ListItem = ({ item, onPress }: any) => {
	const [checked, setChecked] = useState(item.check);
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				px={4}
				py={2}
			>
				<Text fontSize={18} strikeThrough={checked}>
					{item.ingredient.name}
				</Text>
				<TouchableOpacity
					onPress={() => {
						setChecked((prev: boolean) => !prev);
						onPress();
					}}
				>
					<Box padding={2}>
						{checked ? (
							<AntDesign
								name="checkcircle"
								size={30}
								color={Colors.primary[500]}
							/>
						) : (
							<AntDesign
								name="checkcircleo"
								size={30}
								color="black"
							/>
						)}
					</Box>
				</TouchableOpacity>
			</Stack>
			<Divider my={1} />
		</>
	);
};
