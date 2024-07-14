import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Mealplans from "../../screens/mealplans";
import MealplanDetail from "../../screens/mealplans/detail";
import AddRecipes from "../../screens/mealplans/AddRecipes";
import { AddIcon, IconButton, Spinner } from "native-base";
import { useCreateMenu, useMenusData } from "../../hooks/menusHooks";

const MealPlanStack = createNativeStackNavigator();

function MealplanStack() {
	const createMenu = useCreateMenu();

	const { isFetching } = useMenusData();
	return (
		<MealPlanStack.Navigator>
			<MealPlanStack.Screen
				name="MealplanDetail"
				component={MealplanDetail}
				options={{ title: "" }}
			/>

			<MealPlanStack.Screen
				name="AddRecipes"
				component={AddRecipes}
				options={{ title: "Add Recipes" }}
			/>
		</MealPlanStack.Navigator>
	);
}
export default MealplanStack;
