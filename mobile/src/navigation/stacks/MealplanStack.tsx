import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Mealplans from "../../screens/mealplans";

const MealPlanStack = createNativeStackNavigator();

function MealplanStack() {
	return (
		<MealPlanStack.Navigator>
			<MealPlanStack.Screen
				name="Meal plans"
				component={Mealplans}
				options={{ title: "Meal plans" }}
			/>
		</MealPlanStack.Navigator>
	);
}
export default MealplanStack;
