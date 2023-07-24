import {
	useMenuData,
	useRemoveMealFromMenu,
	useUpdateMenu,
} from "../../hooks/menusHooks";
import { View } from "../../components/common";
import { ActivityIndicator, ScrollView } from "react-native";
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
} from "native-base";
import { useState } from "react";

export default function MealplanDetail({ route, navigation }: { route: any }) {
	const { mealplanId } = route.params;
	if (!mealplanId) {
		navigation.navigate("Mealplans");
	}
	const { data, isLoading } = useMenuData(mealplanId);
	const updateMenu = useUpdateMenu(mealplanId);
	const removeRecipe = useRemoveMealFromMenu({ menuId: mealplanId });
	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<ScrollView className="px-2 py-6">
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
								Ingredients: {meal?.ingredients?.length || "0"}
							</Text>
						</Stack>
						<IconButton
							height={10}
							borderRadius="50%"
							icon={<CloseIcon name="close" />}
							onPress={() => {
								removeRecipe.mutate({
									mealId: meal?.id,
									menuId: mealplanId,
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
						mealplanId: mealplanId,
					})
				}
			>
				Add Recipe
			</Button>
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
