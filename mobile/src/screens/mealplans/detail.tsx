import { useMenuData, useUpdateMenu } from "../../hooks/menusHooks";
import { View, Text } from "../../components/common";
import { ActivityIndicator, ScrollView } from "react-native";
import {
	Box,
	Button,
	FormControl,
	Input,
	WarningOutlineIcon,
} from "native-base";
import { useState } from "react";

export default function MealplanDetail({ route }: { route: any }) {
	const { mealplanId } = route.params;
	const { data, isLoading, isError } = useMenuData(mealplanId);
	const updateMenu = useUpdateMenu(mealplanId);
	console.log("DATA => ", JSON.stringify(data, null, 2));
	console.log("mealplanId => ", mealplanId);
	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<ScrollView className="p-2">
			<Name
				name={data.name}
				onUpdateName={(updateData: { name: string }) => {
					updateMenu.mutate({
						id: mealplanId,
						data: { ...updateData },
					});
				}}
			/>
			<Text>Created at: {data.createdAt}</Text>
			<Text className="text-lg mt-2 font-bold">Recipes:</Text>
			{data.meals.map((meal: any) => (
				<View
					key={meal.id}
					className="h-16 bg-white rounded-lg p-2 px-4 shadow my-1"
				>
					<Text className="text-lg">{meal.name}</Text>
					<Text className="text-md text-stone-600">
						Ingredients: {meal.ingredients.length}
					</Text>
				</View>
			))}
		</ScrollView>
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
				<Text
					className="border border-gray-300 rounded-md text-xl"
					onPress={toggleEdit}
				>
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
					defaultValue={text}
					onChange={handleChange}
					onBlur={handleSave}
					InputRightElement={
						<Button
							size="xs"
							rounded="none"
							w="1/6"
							h="full"
							onPress={handleSave}
						>
							Save
						</Button>
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
