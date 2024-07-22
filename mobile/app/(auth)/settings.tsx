import ListItem from "@/components/common/ListItem";
import { HStack, Stack, Text } from "native-base";
import AppBar from "@/components/app-bar/Appbar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useThemeProvider";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

function Settings() {
	const { theme } = useTheme();
	const { signOut } = useAuth();

	const { clearToken } = useContext(AuthContext);

	const handleLogout = () => {
		clearToken();
		signOut();
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
						router.push("household-management");
					}}
					label="Manage Household"
				/>
			</Stack>
		</>
	);
}

export default Settings;
