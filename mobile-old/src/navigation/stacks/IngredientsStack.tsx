import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Ingredients from "../../screens/ingredients";
import { AddIcon, IconButton, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import NewIngredient from "../../screens/ingredients/new";
import IngredientDetail from "../../screens/ingredients/detail";
import {
	useCreateIngredient,
	useIngredientsData,
} from "../../hooks/ingredientsHooks";
import headerOptions from "../HeaderOptions";

const IngredientStack = createNativeStackNavigator();

function IngredientsStack({ navigation }: { navigation: any }) {
	const createIngredient = useCreateIngredient();
	const { isFetching } = useIngredientsData();
	return (
		<IngredientStack.Navigator screenOptions={headerOptions}>
			<IngredientStack.Screen
				name="Ingredients"
				component={Ingredients}
				options={{
					title: "Ingredients",
					headerLeft: () => (
						<>
							{createIngredient.isPending || isFetching ? (
								<Spinner />
							) : (
								<IconButton
									icon={<AddIcon />}
									onPress={() =>
										createIngredient.mutate({
											name: "New Ingredient",
											categoryId: 1,
										})
									}
								/>
							)}
						</>
					),
				}}
			/>
			<IngredientStack.Screen
				name="AddIngredient"
				component={NewIngredient}
				options={{ title: "" }}
			/>
			<IngredientStack.Screen
				name="IngredientDetail"
				component={IngredientDetail}
				options={{ title: "" }}
			/>
		</IngredientStack.Navigator>
	);
}
export default IngredientsStack;
