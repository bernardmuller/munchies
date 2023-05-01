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
import Icons from "../constants/Icons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Box } from "native-base";
import Colors from "../constants/Colors";

const PrivateStack = createBottomTabNavigator();
const PublicStack = createNativeStackNavigator();

function AuthStack() {
	return (
		<PublicStack.Navigator screenOptions={{ headerShown: false }}>
			<PublicStack.Screen name="Login" component={Login} />
		</PublicStack.Navigator>
	);
}

const Icon = ({ name, focused, children }: any) => {
	return (
		<Box
			rounded="full"
			bg={focused ? Colors.light.CTA : "none"}
			height={16}
			width={16}
			alignItems="center"
			justifyContent="center"
		>
			{children}
		</Box>
	);
};

function AppStack() {
	return (
		<>
			<PrivateStack.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarStyle: {
						backgroundColor: Colors.secondary["900"],
						borderTopWidth: 0,
						borderTopColor: "transparent",
						height: 100,
						paddingTop: 35,
						paddingLeft: 10,
						paddingRight: 10,
					},
					tabBarIcon: ({ focused, color, size }) => {
						switch (route.name) {
							case "GroceriesStack":
								return (
									<Icon focused={focused} name="shopping-bag">
										<Feather
											name="shopping-bag"
											focused={focused}
											size={24}
											color={
												focused
													? Colors.white
													: Colors.secondary[400]
											}
										/>
									</Icon>
								);
							case "MealplansStack":
								return (
									<Icon focused={focused} name="fast-food">
										<Ionicons
											name="fast-food"
											focused={focused}
											size={24}
											color={
												focused
													? Colors.white
													: Colors.secondary[400]
											}
										/>
									</Icon>
								);
							case "RecipesStack":
								return (
									<Icon focused={focused} name="book-open">
										<Feather
											name="book-open"
											focused={focused}
											size={24}
											color={
												focused
													? Colors.white
													: Colors.secondary[400]
											}
										/>
									</Icon>
								);
							case "IngredientsStack":
								return (
									<Icon focused={focused} name="list">
										<Feather
											name="list"
											focused={focused}
											size={24}
											color={
												focused
													? Colors.white
													: Colors.secondary[400]
											}
										/>
									</Icon>
								);
							case "SettingsStack":
								return (
									<Icon focused={focused} name="settings">
										<Feather
											name="settings"
											focused={focused}
											size={24}
											color={
												focused
													? Colors.white
													: Colors.secondary[400]
											}
										/>
									</Icon>
								);
							default:
								break;
						}
					},
				})}
			>
				<PrivateStack.Screen
					name="GroceriesStack"
					component={GroceriesStack}
					options={{
						title: "",
					}}
				/>
				<PrivateStack.Screen
					name="MealplansStack"
					component={MealplanStack}
					options={{ title: "" }}
				/>
				<PrivateStack.Screen
					name="RecipesStack"
					component={RecipeStack}
					options={{
						title: "",
					}}
				/>
				<PrivateStack.Screen
					name="IngredientsStack"
					component={IngredientsStack}
					options={{ title: "" }}
				/>
				<PrivateStack.Screen
					name="SettingsStack"
					component={SettingsStack}
					options={{ title: "" }}
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
