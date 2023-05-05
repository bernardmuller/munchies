import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Grocerylists from "../../screens/grocerylists";
import GrocerylistDetail from "../../screens/grocerylists/detail";

const MealPlanStack = createNativeStackNavigator();

function MealplanStack() {
	return (
		<MealPlanStack.Navigator
      screenOptions={{
        
      }}
    >
			<MealPlanStack.Screen
				name="Grocerylists"
				component={Grocerylists}
				options={{
					title: "Grocerylists",
				}}
			/>
			<MealPlanStack.Screen
				name="GrocerylistDetail"
				component={GrocerylistDetail}
				options={{ title: "" }}
			/>
		</MealPlanStack.Navigator>
	);
}
export default MealplanStack;
