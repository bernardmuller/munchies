import { useMenuData, useUpdateMenu } from "../../hooks/menusHooks";
import { View } from "../../components/common";
import { ActivityIndicator, ScrollView } from "react-native";
import {
	Box,
	Button,
	FormControl,
	Icon,
	IconButton,
	Input,
	Stack,
	WarningOutlineIcon,
	Text,
	CloseIcon,
	CheckIcon,
} from "native-base";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

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
			<Text color="gray.400">Created at: {data.createdAt}</Text>
			<Text className="text-lg mt-2 font-bold">Recipes:</Text>
			{data.meals.map((meal: any) => (
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
							Ingredients: {meal.ingredients.length}
						</Text>
					</Stack>
					<IconButton
						height={10}
						borderRadius="50%"
						icon={<CloseIcon name="close" />}
					/>
				</Stack>
			))}
			<Button mt={3}>Add Recipe</Button>
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
					h="10"
					mb={1}
					fontSize="md"
					variant="underlined"
					defaultValue={text}
					onChange={handleChange}
					onBlur={handleSave}
					InputRightElement={
						<IconButton
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
