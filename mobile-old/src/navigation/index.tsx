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
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import Colors from "../constants/Colors";
import DashboardStack from "./stacks/DashboardStack";
import { FiFeather, FiSettings } from "react-icons/fi";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const PrivateStack = createBottomTabNavigator();
const PublicStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const ICON_SIZE = 26;

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
			height={10}
			width={10}
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
						height: 90,
						paddingTop: 25,
						paddingLeft: 60,
						paddingRight: 60,
					},
					tabBarIcon: ({ focused, color, size }) => {
						switch (route.name) {
							case "DashboardStack":
								return (
									<>
										<Icon focused={focused} name="home">
											<Octicons
												name="home"
												focused={focused}
												size={ICON_SIZE}
												color={
													focused
														? Colors.white
														: Colors.secondary[400]
												}
											/>
										</Icon>
										<Text color="white" fontSize={12}>
											Home
										</Text>
									</>
								);
							case "MealplansStack":
								return (
									<Icon focused={focused} name="fast-food">
										<Ionicons
											name="fast-food"
											focused={focused}
											size={ICON_SIZE}
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
									<>
										<Icon focused={focused} name="settings">
											<Ionicons
												name="settings-sharp"
												size={ICON_SIZE}
												color={
													focused
														? Colors.white
														: Colors.secondary[400]
												}
											/>
										</Icon>
										<Text color="white" fontSize={12}>
											Settings
										</Text>
									</>
								);
							case "IngredientsStack":
								return (
									<>
										<Icon focused={focused} name="list">
											<Feather
												name="list"
												focused={focused}
												size={ICON_SIZE}
												color={
													focused
														? Colors.white
														: Colors.secondary[400]
												}
											/>
										</Icon>
										<Text color="white" fontSize={12}>
											Items
										</Text>
									</>
								);
							default:
								break;
						}
					},
				})}
			>
				<PrivateStack.Screen
					name="DashboardStack"
					component={DashboardStack}
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
					options={{
						title: "",
					}}
				/>
			</PrivateStack.Navigator>
		</>
	);
}

// const Admin = () => {
// 	return (
// 		<>
// 			<AdminStack.Navigator>
// 				<AdminStack.Screen
// 					name="SettingsStack"
// 					component={SettingsStack}
// 				/>
// 			</AdminStack.Navigator>
// 		</>
// 	);
// };

function AppNavigation() {
	const { authToken } = useContext(AuthContext);
	return (
		<BottomSheetModalProvider>
			<NavigationContainer>
				{authToken !== "" ? (
					<>
						<AppStack />
					</>
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		</BottomSheetModalProvider>
	);
}

export default AppNavigation;
