import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../../screens/dashboard";
import headerOptions from "../HeaderOptions";
import { IconButton } from "native-base";
import Common from "./CommonStack";
import { useCreateGrocerylist } from "src/hooks/grocerylistHooks";
import Colors from "src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

import { useCurrentUserHousold } from "src/hooks/householdHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardStack = createNativeStackNavigator();

function DashboardRoute() {
	const createGroceryList = useCreateGrocerylist();

	const household = useCurrentUserHousold();
	return (
		<DashboardStack.Navigator screenOptions={headerOptions}>
			<DashboardStack.Screen
				name="Home"
				component={Dashboard}
				options={{
					headerLeft: () => {
						return (
							<>
								<IconButton
									icon={
										<AntDesign
											name="pluscircleo"
											size={28}
											color={Colors.dark.background}
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
