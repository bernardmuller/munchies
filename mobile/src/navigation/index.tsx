import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SettingsStack from "./stacks/SettingsStack";
import IngredientsStack from "./stacks/IngredientsStack";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { Box, NativeBaseProvider } from "native-base";
import Colors from "../constants/Colors";
import DashboardStack from "./stacks/DashboardStack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTheme } from "src/hooks/useThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PrivateStack = createBottomTabNavigator();
const PublicStack = createNativeStackNavigator();

const ICON_SIZE = 26;

function AuthStack() {
	return (
		<PublicStack.Navigator screenOptions={{ headerShown: false }}>
			<PublicStack.Screen name="Login" component={Login} />
		</PublicStack.Navigator>
	);
}

const Icon = ({ focused, children }: any) => {
	return (
		<Box
			rounded="full"
			bg={focused ? Colors.light.CTA : "none"}
			height={12}
			width={12}
			alignItems="center"
			justifyContent="center"
		>
			{children}
		</Box>
	);
};

function AppStack() {
	const { theme } = useTheme();
	return (
		<>
			<PrivateStack.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					headerStyle: {
						backgroundColor: theme.colors.background,
						headerShadowVisible: false,
						borderBottomWidth: 0,
					},
					tabBarStyle: {
						backgroundColor: theme.colors.background_dark,
						borderTopWidth: 0,
						borderTopColor: "transparent",
						height: 90,
						paddingTop: 25,
						paddingLeft: 60,
						paddingRight: 60,
					},
					tabBarIcon: ({ focused }) => {
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
														? theme.colors.white
														: theme.colors
																.secondary[400]
												}
											/>
										</Icon>
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
													? theme.colors.white
													: theme.colors
															.secondary[400]
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
														? theme.colors.white
														: theme.colors
																.secondary[400]
												}
											/>
										</Icon>
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
														? theme.colors.white
														: theme.colors
																.secondary[400]
												}
											/>
										</Icon>
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

function AppNavigation() {
	const { authToken } = useContext(AuthContext);
	const { theme } = useTheme();
	return (
		<NavigationContainer>
			<NativeBaseProvider theme={theme}>
				<GestureHandlerRootView>
					<BottomSheetModalProvider>
						{authToken !== "" ? (
							<>
								<AppStack />
							</>
						) : (
							<AuthStack />
						)}
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</NativeBaseProvider>
		</NavigationContainer>
	);
}

export default AppNavigation;
