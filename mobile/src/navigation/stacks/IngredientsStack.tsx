import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ingredients from "../../screens/ingredients";
import NewIngredient from "../../screens/ingredients/new";
import IngredientDetail from "../../screens/ingredients/detail";
import headerOptions from "../HeaderOptions";

const IngredientStack = createNativeStackNavigator();

function IngredientsStack() {
	return (
		<IngredientStack.Navigator screenOptions={headerOptions}>
			<IngredientStack.Screen
				name="Ingredients"
				component={Ingredients}
				options={{
					headerShown: false,
				}}
			/>
			<IngredientStack.Screen
				name="AddIngredient"
				component={NewIngredient}
				options={{ title: "" }}
			/>
			<IngredientStack.Screen
				name="IngredientDetail"
				component={IngredientDetail}
				options={{ title: "", headerShown: false }}
			/>
		</IngredientStack.Navigator>
	);
}
export default IngredientsStack;
