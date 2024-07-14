import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../../screens/dashboard";
import { IconButton } from "native-base";
import Common from "./CommonStack";
import { useCreateGrocerylist } from "src/hooks/grocerylistHooks";
import { AntDesign } from "@expo/vector-icons";

import { useCurrentUserHousold } from "src/hooks/householdHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "src/hooks/useThemeProvider";

const DashboardStack = createNativeStackNavigator();

function DashboardRoute() {
	const createGroceryList = useCreateGrocerylist();
	const { theme } = useTheme();

	const household = useCurrentUserHousold();
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen
				name="Home"
				component={Dashboard}
				options={{
					headerShown: false,
					headerLeft: () => {
						return (
							<>
								<IconButton
									icon={
										<AntDesign
											name="pluscircleo"
											size={28}
											color={theme.colors.white}
										/>
									}
									onPress={async () => {
										await AsyncStorage.getItem(
											"lastDashboardTab"
										)
											.then((value) => {
												return value;
											})
											.then((value) => {
												if (value === "1") {
													if (
														!household.data?.data
															?.id
													)
														return;
													createGroceryList.mutateAsync(
														{
															householdId:
																household.data
																	?.data
																	?.id as string,
														}
													);
												} else if (value === "0") {
													createGroceryList.mutateAsync(
														{
															householdId: null,
														}
													);
												}
											});
									}}
								/>
							</>
						);
					},
				}}
			/>
			{Common({ navigator: DashboardStack })}
		</DashboardStack.Navigator>
	);
}
export default DashboardRoute;
