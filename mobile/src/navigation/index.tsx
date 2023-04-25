import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import MealplanStack from "./stacks/MealplanStack";
import RecipeStack from "./stacks/RecipeStack";
import SettingsStack from "./stacks/SettingsStack";
import GroceriesStack from "./stacks/GroceriesStack";
import IngredientsStack from "./stacks/IngredientsStack";

const PrivateStack = createBottomTabNavigator();
const PublicStack = createNativeStackNavigator();

function AuthStack() {
	return (
		<PublicStack.Navigator screenOptions={{ headerShown: false }}>
			<PublicStack.Screen name="Login" component={Login} />
		</PublicStack.Navigator>
	);
}

function AppStack() {
	return (
		<>
			<PrivateStack.Navigator screenOptions={{ headerShown: false }}>
				<PrivateStack.Screen
					name="GroceriesStack"
					component={GroceriesStack}
					options={{ title: "Grocerylists" }}
				/>
				<PrivateStack.Screen
					name="MealplansStack"
					component={MealplanStack}
					options={{ title: "Meal plans" }}
				/>
				<PrivateStack.Screen
					name="RecipesStack"
					component={RecipeStack}
					options={{ title: "Recipes" }}
				/>
				<PrivateStack.Screen
					name="IngredientsStack"
					component={IngredientsStack}
					options={{ title: "Ingredients" }}
				/>
				<PrivateStack.Screen
					name="SettingsStack"
					component={SettingsStack}
					options={{ title: "Settings" }}
				/>
			</PrivateStack.Navigator>
		</>
	);
}

function AppNavigation() {
	const { authToken } = useContext(AuthContext);
	return (
		<NavigationContainer>
			{authToken !== "" ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
}

export default AppNavigation;
