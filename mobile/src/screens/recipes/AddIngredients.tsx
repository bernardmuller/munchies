import {
	useAddMealToMenu,
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
import {
	useAddIngredientToMeal,
	useMealData,
	useMealsData,
	useRemoveIngredientFromMeal,
	useUpdateMeal,
} from "../../hooks/mealsHooks";
import { useIngredientsData } from "../../hooks/ingredientsHooks";

export default function AddIngredients({ route }: { route: any }) {
	const { recipeId } = route.params;
	const { data, isLoading, isError } = useIngredientsData();
	const meal = useMealData(recipeId);
	const updateMenu = useUpdateMeal(recipeId);
	const addIngredient = useAddIngredientToMeal({ mealId: recipeId });
	const removeIngredient = useRemoveIngredientFromMeal({ mealId: recipeId });
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	console.log("MEAL => ", meal);
	console.log(
		"INGREDIENTS => ",
		JSON.stringify(meal.data.ingredients, null, 2)
	);

	return (
		<ScrollView className="px-2 py-2">
			{data.map((ingredient: any) => {
				return (
					<Stack
						direction="row"
						key={ingredient.id}
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
							<Text fontSize="xl">{ingredient.name}</Text>
							<Text fontSize="sm" color="gray.400">
								Ingredients: meal.ingredients.length
							</Text>
						</Stack>
						{meal?.data?.ingredients &&
						meal?.data?.ingredients?.find(
							(ing: any) => ing.id === ingredient.id
						) ? (
							<IconButton
								height={10}
								borderRadius="50%"
								icon={<MinusIcon name="minus" />}
								onPress={() =>
									removeIngredient.mutate({
										ingredientId: ingredient?.id,
										mealId: recipeId,
									})
								}
							/>
						) : (
							<IconButton
								height={10}
								borderRadius="50%"
								icon={<AddIcon name="plus" />}
								onPress={() =>
									addIngredient.mutate({
										ingredient: ingredient,
										mealId: recipeId,
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
