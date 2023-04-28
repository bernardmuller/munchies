import React, { useState } from "react";
import { useGrocerylistData } from "../../hooks/grocerylistHooks";
import { View, Text } from "../../components/common";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Box, Divider, FlatList, Spacer, Stack } from "native-base";
import { Category, categories } from "../../constants/ingredientCategories";

const data = [
	{
		id: "1",
		menu: "Produce",
		items: [
			{ id: "1", name: "Apples" },
			{ id: "2", name: "Bananas" },
			{ id: "3", name: "Oranges" },
		],
	},
	{
		id: "2",
		menu: "Dairy",
		items: [
			{ id: "4", name: "Milk" },
			{ id: "5", name: "Cheese" },
		],
	},
];

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

	const items = categories.map((category: Category) => {
		return {
			id: category.id,
			items: data.items.filter(
				(i: any) => i.ingredient.categoryId === category.id
			),
		};
	});

	const renderItem = ({ item }: any) => {
		return (
			<View
				className={`flex-row items-center justify-between py-3 px-4 border-b border-gray-200`}
			>
				<Text className={`text-base font-medium text-gray-800`}>
					{item.ingredient.name}
				</Text>
				<TouchableOpacity
					className={`bg-white border border-gray-400 rounded-full p-2`}
					// onPress={() => handleCheckItem(item.menuId, item.id)}
				>
					{item.checked && (
						<AntDesign name="check" size={18} color="green" />
					)}
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View className={`flex-1 bg-white p-2`}>
			<Text className="text-2xl font-semibold py-2">
				{data.menu.name} Grocerylist
			</Text>
			<Text className="text-xl py-2">Items</Text>

			<FlatList
				data={items}
				renderItem={({ item }) => {
					return (
						<Stack>
							<Box
								h={12}
								display="flex"
								justifyContent="center"
								p={1}
							>
								<Text>{categories[item?.id]?.name}</Text>
							</Box>
							<Divider />
							<FlatList
								data={item.items}
								renderItem={renderItem}
							/>
						</Stack>
					);
				}}
				keyExtractor={(item: any) => item.id}
			/>
		</View>
	);
}
