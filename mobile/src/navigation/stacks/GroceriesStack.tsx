import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar, View } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Header from "../../components/headers/Header";
import Grocerylists from "../../screens/grocerylists";
import GrocerylistDetail from "../../screens/grocerylists/detail";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import SettingsScreen from "../../screens/settings";
const MealPlanStack = createNativeStackNavigator();

function MealplanStack() {
	const { clearToken } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const handleLogout = () => {
		clearToken();
		navigation.navigate("Login");
	};
	return (
		<MealPlanStack.Navigator screenOptions={{}}>
			<MealPlanStack.Screen
				name="Grocerylists"
				component={Grocerylists}
				options={{
					headerStyle: {},
					headerTitle: () => <Header name="Grocerylists" />,
					headerRight: () => (
						<View>
							<TouchableOpacity
								onPress={() => navigation.navigate("Settings")}
							>
								<Avatar
									size="sm"
									source={{
										uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
									}}
								/>
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<MealPlanStack.Screen
				name="GrocerylistDetail"
				component={GrocerylistDetail}
				options={{ title: "" }}
			/>
			<MealPlanStack.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: "",
					headerRight: () => (
						<>
							<TouchableOpacity onPress={() => handleLogout()}>
								{/* <FiLogOut size={18} /> */}
								<Feather
									name="log-out"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
						</>
					),
				}}
			/>
		</MealPlanStack.Navigator>
	);
}
export default MealplanStack;
