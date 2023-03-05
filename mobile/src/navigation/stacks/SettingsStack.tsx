import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SettingsScreen from "../../screens/settings";

const SettingsStack = createNativeStackNavigator();

function Settings() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

export default Settings;
