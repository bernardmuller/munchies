import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SettingsScreen from "../../screens/settings";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { DeleteIcon, IconButton } from "native-base";
import { FiLogOut } from "react-icons/fi";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Common from "./CommonStack";
import HouseholdManagementScreen from "src/screens/household-management";

const SettingsStack = createNativeStackNavigator();

function Settings() {
	const { clearToken } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const handleLogout = () => {
		clearToken();
		navigation.navigate("Login");
	};

	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{
					title: "Settings",
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

			{Common({ navigator: SettingsStack })}
		</SettingsStack.Navigator>
	);
}

export default Settings;
