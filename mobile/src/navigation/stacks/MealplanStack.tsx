import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Mealplans from "../../screens/mealplans";
import MealplanDetail from "../../screens/mealplans/detail";
import AddRecipes from "../../screens/mealplans/AddRecipes";

const MealPlanStack = createNativeStackNavigator();

function MealplanStack() {
	return (
		<MealPlanStack.Navigator>
			<MealPlanStack.Screen
				name="Mealplans"
				component={Mealplans}
				options={{ title: "Meal plans" }}
			/>

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
