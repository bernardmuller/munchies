import * as React from "react";
import SettingsScreen from "../../screens/settings";
import { AuthContext } from "../../contexts/AuthContext";
import { TypedNavigator, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FiLogOut } from "react-icons/fi";
import HouseholdManagementScreen from "src/screens/household-management";

function Common({ navigator }: any) {
	const { clearToken } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const handleLogout = () => {
		clearToken();
		navigation.navigate("Login");
	};

	return (
		<>
			<navigator.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: "",
					headerRight: () => (
						<>
							<TouchableOpacity onPress={() => handleLogout()}>
								<FiLogOut size={18} />
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
			<navigator.Screen
				name="HouseholdManagement"
				component={HouseholdManagementScreen}
				options={{
					headerShown: false,
				}}
			/>
		</>
	);
}

export default Common;
