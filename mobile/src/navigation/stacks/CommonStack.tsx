import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SettingsScreen from "../../screens/settings";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCreateMenu, useMenusData } from "../../hooks/menusHooks";
import Mealplans from "../../screens/mealplans";
import { AddIcon, IconButton, Spinner } from "native-base";
import MealplanDetail from "../../screens/mealplans/detail";
import AddRecipes from "../../screens/mealplans/AddRecipes";

function Common({ navigator }: any) {
	const { clearToken } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const handleLogout = () => {
		clearToken();
		navigation.navigate("Login");
	};
	const createMenu = useCreateMenu();

	const { isFetching } = useMenusData();

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
			<navigator.Screen
				name="Mealplans"
				component={Mealplans}
				options={{
					title: "Meal plans",
					headerRight: () => (
						<>
							{createMenu.isLoading || isFetching ? (
								<Spinner />
							) : (
								<IconButton
									icon={<AddIcon />}
									onPress={() => createMenu.mutate()}
								/>
							)}
						</>
					),
				}}
			/>
			<navigator.Screen
				name="MealplanDetail"
				component={MealplanDetail}
				options={{ title: "" }}
			/>
			<navigator.Screen
				name="AddRecipes"
				component={AddRecipes}
				options={{ title: "Add Recipes" }}
			/>
		</>
	);
}

export default Common;
