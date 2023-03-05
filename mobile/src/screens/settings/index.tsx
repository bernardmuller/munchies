import { Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { AuthContext } from "../../contexts/AuthContext";

function Recipes({ navigation }: { navigation: any }) {
  const { clearToken } = React.useContext(AuthContext);

  const handleLogout = () => {
    clearToken();
    navigation.navigate("Login")
  }

  return (
    <View className="grid gap-1 mt-1">
      <Button title="Log out" onPress={handleLogout}
      />
    </View>
  );
}

export default Recipes;
