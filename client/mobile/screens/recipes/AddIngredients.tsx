import { View } from "../../components/common";
import { ActivityIndicator, ScrollView } from "react-native";
import {
	IconButton,
	Stack,
	Text,
	AddIcon,
	MinusIcon,
	FlatList,
} from "native-base";
import {
	useAddIngredientToMeal,
	useMealData,
	useRemoveIngredientFromMeal,
} from "../../hooks/mealsHooks";
import { useIngredientsData } from "../../hooks/ingredientsHooks";
import { categories } from "../../constants/ingredientCategories";

export default function AddIngredients({ route }: { route: any }) {
	const { recipeId } = route.params;
	const { data, isLoading, isError } = useIngredientsData();
	const meal = useMealData(recipeId);
	const addIngredient = useAddIngredientToMeal({ mealId: recipeId });
	const removeIngredient = useRemoveIngredientFromMeal({ mealId: recipeId });
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<View className="px-2 py-2" pb={6}>
			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<Stack
						direction="row"
						key={item?.ingredient?.id}
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
							<Text fontSize="xl">{item?.name}</Text>
							<Text fontSize="sm" color="gray.400">
								Category:{" "}
								{
									categories.find(
										(cat) => cat.id === item?.categoryId
									)?.name
								}
							</Text>
						</Stack>
						{meal?.data?.ingredients &&
						meal?.data?.ingredients?.find(
							(ing: any) => ing?.id === item?.id
						) ? (
							<IconButton
								height={10}
								borderRadius="50%"
								icon={<MinusIcon name="minus" />}
								onPress={() =>
									removeIngredient.mutate({
										ingredientId: item?.id,
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
										ingredient: item?.id,
										mealId: recipeId,
									})
								}
							/>
						)}
					</Stack>
				)}
			/>
		</View>
	);
}
