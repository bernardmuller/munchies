import {
	useCreateMenu,
	useCurrentMenuData,
	useMenuData,
	useRemoveMealFromMenu,
	useUpdateMenu,
} from "../../hooks/menusHooks";
import { View } from "../../components/common";
import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	Input,
	Stack,
	WarningOutlineIcon,
	Text,
	CloseIcon,
	CheckIcon,
	FlatList,
	ChevronDownIcon,
	Divider,
} from "native-base";
import { useState } from "react";
import { categories, Category } from "../../constants/ingredientCategories";
import { useCheckItem, useUnCheckItem } from "../../hooks/items";
import { AntDesign } from "@expo/vector-icons";
import { useGrocerylistData } from "../../hooks/grocerylistHooks";

export default function MealplanDetail({ route, navigation }: { route: any }) {
	const { data, isLoading } = useCurrentMenuData();
	const updateMenu = useUpdateMenu(data?.id);
	// const createMenu = useCreateMenu();
	const removeRecipe = useRemoveMealFromMenu({ menuId: "" });
	const [activeTab, setActiveTab] = useState<"menu" | "grocerylist">("menu");
	// const grocerylistData = useGrocerylistData(data?.grocerylistId);

	if (isLoading) return <ActivityIndicator size={30} />;

	const items = categories
		?.map((category: Category) => {
			return {
				id: category.id,
				items: data?.grocerylist?.items?.filter(
					(i: any) => i.ingredient.categoryId === category.id
				),
			};
		})
		?.filter((i: any) => i.items.length > 0);

	return (
		<SafeAreaView>
			<Stack px={4} py={2}>
				<Text>Dashboard</Text>
				<Name
					name={data.name}
					onUpdateName={(updateData: { name: string }) => {
						updateMenu.mutate({
							id: "",
							data: { ...updateData },
						});
					}}
				/>
				<Text color="gray.400">Created at: {data.createdAt}</Text>
				{activeTab === "menu" ? (
					<>
						<Stack py={3} pt={6}>
							<Text fontSize="md">Recipes:</Text>
							{data?.meals?.map((meal: any) => (
								<Stack
									direction="row"
									key={meal.id}
									height="20"
									bgColor="white"
									borderRadius={10}
									p={2}
									px={4}
									shadow="2"
									my={1}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<Stack justifyContent="space-evenly">
										<Text fontSize="xl">{meal.name}</Text>
										<Text fontSize="sm" color="gray.400">
											Ingredients:{" "}
											{meal?.ingredients?.length || "0"}
										</Text>
									</Stack>
									<IconButton
										height={10}
										borderRadius="50%"
										icon={<CloseIcon name="close" />}
										onPress={() => {
											removeRecipe.mutate({
												mealId: meal.id,
												menuId: "",
											});
										}}
									/>
								</Stack>
							))}
						</Stack>
						<Button
							mb={2}
							onPress={() =>
								navigation.navigate("AddRecipes", {
									mealplanId: data.id,
								})
							}
						>
							Add Recipe
						</Button>
					</>
				) : (
					<Stack p={2}>
						<Text fontSize="2xl" fontWeight="semibold">
							{data.menu.name} Grocerylist
						</Text>
						<Text fontSize="xl">Items</Text>

						<FlatList
							data={items}
							renderItem={({ item }) => {
								return (
									<CategoryItem
										item={item}
										grocerylistId={data.grocerylistId}
									/>
								);
							}}
							keyExtractor={(item: any) => item.id}
							mb={20}
						/>
					</Stack>
				)}
			</Stack>
		</SafeAreaView>
	);
}

const Name = ({ name, onUpdateName }: any) => {
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(name || "");
	const [error, setError] = useState(false);

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const handleChange = (e: any) => {
		setError(false);
		setText(e.nativeEvent.text);
	};

	const handleSave = () => {
		if (!text) {
			setError(true);
			return;
		}
		toggleEdit();
		onUpdateName({ name: text });
	};

	if (!edit) {
		return (
			<View className="flex flex-col">
				<Text fontSize="2xl" fontWeight="semibold" onPress={toggleEdit}>
					{text}
				</Text>
			</View>
		);
	}

	return (
		<Box alignItems="center py-2">
			<FormControl isInvalid={error}>
				<Input
					type="text"
					w="100%"
					h="16"
					mb={1}
					px={4}
					fontSize="md"
					variant="outline"
					rounded={10}
					defaultValue={text}
					onChange={handleChange}
					onBlur={handleSave}
					InputRightElement={
						<IconButton
							mr={2}
							icon={
								<CheckIcon
									size="lg"
									rounded="full"
									w="1/6"
									h="full"
								></CheckIcon>
							}
							onPress={handleSave}
						/>
					}
					placeholder="Enter name..."
				/>
				{error && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size="xs" />}
					>
						Please enter a valid name.
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		</Box>
	);
};

const CategoryItem = ({ item, grocerylistId }: any) => {
	const [expanded, setExpanded] = useState(false);
	const checkItemMutation = useCheckItem(grocerylistId);
	const unCheckItemMutation = useUnCheckItem(grocerylistId);

	return (
		<Stack>
			<TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
				<Stack
					direction="row"
					key={item.id}
					height="20"
					bgColor="white"
					borderRadius={10}
					p={2}
					px={6}
					shadow="2"
					my={1}
					mx={1}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Text>{categories[item?.id - 1]?.name}</Text>
					<ChevronDownIcon />
				</Stack>
			</TouchableOpacity>
			{expanded && (
				<FlatList
					data={item.items}
					renderItem={({ item }: any) => (
						<Item
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
		</Stack>
	);
};

const Item = ({ item, onPress }: any) => {
	const [checked, setChecked] = useState(item.check);
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				px={4}
				py={4}
			>
				<Text>{item.ingredient.name}</Text>
				<TouchableOpacity
					onPress={() => {
						setChecked((prev: boolean) => !prev);
						onPress();
					}}
				>
					{checked ? (
						<AntDesign name="checkcircle" size={24} color="black" />
					) : (
						<AntDesign
							name="checkcircleo"
							size={24}
							color="black"
						/>
					)}
				</TouchableOpacity>
			</Stack>
			<Divider my={1} />
		</>
	);
};
