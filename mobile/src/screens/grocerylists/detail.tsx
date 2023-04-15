import React, { useState } from "react";
import { useGrocerylistData } from "../../hooks/grocerylistHooks";
import { View, Text } from "../../components/common";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Divider, FlatList, Spacer } from "native-base";

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
	const [groceryList, setGroceryList] = useState(data.items);

	console.log("DATA => ", data);

	const handleCheckItem = (menuId: any, itemId: any) => {
		const newList = [...groceryList];
		const menuIndex = newList.findIndex((menu) => menu.id === menuId);
		const itemIndex = newList[menuIndex].items.findIndex(
			(item: any) => item.id === itemId
		);
		newList[menuIndex].items[itemIndex].checked =
			!newList[menuIndex].items[itemIndex].checked;
		setGroceryList(newList);
	};

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

	const renderMenu = ({ item }: any) => {
		return (
			<View className={`bg-gray-100 py-2 px-4 border-b border-gray-200`}>
				<Text className={`text-base font-medium text-gray-600`}>
					{item.ingredient.name}
				</Text>
				<FlatList
					data={item.items}
					renderItem={renderItem}
					keyExtractor={(item: any) => item.id}
				/>
			</View>
		);
	};

	return (
		<View className={`flex-1 bg-white p-2`}>
			<Text className="text-2xl font-semibold py-2">
				{data.menu.name} Grocerylist
			</Text>
			<Text className="text-xl py-2">Items</Text>
			<Divider />
			<FlatList
				data={groceryList}
				renderItem={renderItem}
				keyExtractor={(item: any) => item.id}
			/>
		</View>
	);
}
