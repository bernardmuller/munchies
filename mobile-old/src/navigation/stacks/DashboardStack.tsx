import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import Dashboard from "../../screens/dashboard";
import headerOptions from "../HeaderOptions";
import { useCreateMenu } from "../../hooks/menusHooks";
import { useCurrentMenuData } from "../../hooks/menusHooks";
import { Box, IconButton, Spinner } from "native-base";
import Common from "./CommonStack";
import { useCreateGrocerylist } from "src/hooks/grocerylistHooks";
import Colors from "src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const DashboardStack = createNativeStackNavigator();

function DashboardRoute() {
	const createGroceryList = useCreateGrocerylist();
	const { isFetching } = useCurrentMenuData();
	return (
		<DashboardStack.Navigator screenOptions={headerOptions}>
			<DashboardStack.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					headerLeft: () => {
						return (
							<>
								{isFetching ? (
									<Spinner />
								) : (
									<IconButton
										icon={
											<AntDesign
												name="pluscircleo"
												size={28}
												color={Colors.dark.background}
											/>
										}
										onPress={() =>
											createGroceryList.mutateAsync()
										}
									/>
								)}
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
