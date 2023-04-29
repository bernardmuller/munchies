import React, { useState } from "react";
import { useGrocerylistData } from "../../hooks/grocerylistHooks";

import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
	ChevronDownIcon,
	Divider,
	FlatList,
	Stack,
	Text,
	View,
} from "native-base";
import { Category, categories } from "../../constants/ingredientCategories";

export default function Detail({ route }: { route: any }) {
	const { grocerylistId } = route.params;
	const { data } = useGrocerylistData(grocerylistId);
	// const [groceryList, setGroceryList] = useState(data.items);

	// const handleCheckItem = (menuId: any, itemId: any) => {
	// 	const newList = [...groceryList];
	// 	const menuIndex = newList.findIndex((menu) => menu.id === menuId);
	// 	const itemIndex = newList[menuIndex].items.findIndex(
	// 		(item: any) => item.id === itemId
	// 	);
	// 	newList[menuIndex].items[itemIndex].checked =
	// 		!newList[menuIndex].items[itemIndex].checked;
	// 	setGroceryList(newList);
	// };

	if (!data) return <Text>Loading...</Text>;

	const items = categories
		.map((category: Category) => {
			return {
				id: category.id,
				items: data.items.filter(
					(i: any) => i.ingredient.categoryId === category.id
				),
			};
		})
		.filter((i: any) => i.items.length > 0);

	return (
		<Stack p={2}>
			<Text fontSize="2xl" fontWeight="semibold">
				{data.menu.name} Grocerylist
			</Text>
			<Text fontSize="xl">Items</Text>

			<FlatList
				data={items}
				renderItem={({ item }) => {
					return <CategoryItem item={item} />;
				}}
				keyExtractor={(item: any) => item.id}
				mb={20}
			/>
		</Stack>
	);
}

const CategoryItem = ({ item }: any) => {
	const [expanded, setExpanded] = useState(false);

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
			{expanded && <FlatList data={item.items} renderItem={Item} />}
		</Stack>
	);
};

const Item = ({ item }: any) => {
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

				// onPress={() => handleCheckItem(item.menuId, item.id)}
				>
					{/* {item.checked && ( */}
					<AntDesign name="check" size={22} color="green" />
					{/* )} */}
				</TouchableOpacity>
			</Stack>
			<Divider my={1} />
		</>
	);
};
