import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Mealplans from "../../screens/mealplans";
import MealplanDetail from "../../screens/mealplans/detail";

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
        options={{ title: "Meal plan detail" }}
      />
    </MealPlanStack.Navigator>
  );
}
export default MealplanStack;
