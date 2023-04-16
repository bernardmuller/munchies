import {
	useAddMealToMenu,
	useMenuData,
	useUpdateMenu,
} from "../../hooks/menusHooks";
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
	AddIcon,
	MinusIcon,
} from "native-base";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useMealsData } from "../../hooks/mealsHooks";

export default function AddRecipes({ route }: { route: any }) {
	const { mealplanId } = route.params;
	const { data, isLoading, isError } = useMealsData();
	const mealplan = useMenuData(mealplanId);
	const updateMenu = useUpdateMenu(mealplanId);
	const addRecipe = useAddMealToMenu({ menuId: mealplanId });
	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<ScrollView className="px-2 py-2">
			{data.map((meal: any) => {
				return (
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
								Ingredients: meal.ingredients.length
							</Text>
						</Stack>
						{mealplan.data.meals.find(
							(mealplanMeal: any) => mealplanMeal.id === meal.id
						) ? (
							<IconButton
								height={10}
								borderRadius="50%"
								icon={<MinusIcon name="plus" />}
							/>
						) : (
							<IconButton
								height={10}
								borderRadius="50%"
								icon={<AddIcon name="plus" />}
								onPress={() =>
									addRecipe.mutate({
										mealId: meal.id,
										menuId: mealplanId,
									})
								}
							/>
						)}
					</Stack>
				);
			})}
		</ScrollView>
	);
}
