import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import Dashboard from "../../screens/dashboard";
import headerOptions from "../HeaderOptions";
import { useCreateMenu } from "../../hooks/menusHooks";
import { useCurrentMenuData } from "../../hooks/menusHooks";
import { AddIcon, IconButton, Spinner } from "native-base";
import Common from "./CommonStack";

const DashboardStack = createNativeStackNavigator();

function DashboardRoute() {
	const createMealplan = useCreateMenu();
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
								{createMealplan.isLoading || isFetching ? (
									<Spinner />
								) : (
									<IconButton
										icon={<AddIcon />}
										onPress={() => createMealplan.mutate()}
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
