import ListItem from "../../components/common/ListItem";
import { HStack, Stack, Text } from "native-base";
import AppBar from "@/components/app-bar/Appbar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useThemeProvider";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

function Settings() {
	const { theme } = useTheme();

	const { clearToken } = useContext(AuthContext);
	const navigation = useNavigation();

	const handleLogout = () => {
		clearToken();
	};

	return (
		<>
			<AppBar>
				<HStack width="full" justifyContent="space-between">
					<Text fontSize={20} fontWeight="bold">
						Settings
					</Text>
					<TouchableOpacity onPress={() => handleLogout()}>
						<Feather
							name="log-out"
							size={28}
							color={theme.colors.text.muted}
						/>
					</TouchableOpacity>
				</HStack>
			</AppBar>
			<Stack
				h="full"
				backgroundColor={theme.colors.background_dark}
				p={3}
			>
				<ListItem
					onPress={() => {
						navigation.navigate("HouseholdManagement");
					}}
					label="Manage Household"
				/>
			</Stack>
		</>
	);
}

export default Settings;
