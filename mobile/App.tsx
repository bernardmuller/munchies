import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { NativeBaseProvider, Box } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "src/types";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabOneScreen from "./src/screens/TabOneScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator<any>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<NativeBaseProvider>
				<SafeAreaProvider>
					{/* <Navigation colorScheme={colorScheme} /> */}
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Login">
							<Stack.Screen
								name="Login"
								component={LoginScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Home"
								component={HomeScreen}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>

					<StatusBar />
				</SafeAreaProvider>
			</NativeBaseProvider>
		);
	}
}
