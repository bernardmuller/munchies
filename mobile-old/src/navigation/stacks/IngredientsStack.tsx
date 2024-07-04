import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Ingredients from "../../screens/ingredients";
import {
	AddIcon,
	Button,
	CheckIcon,
	FormControl,
	IconButton,
	Input,
	Select,
	Spinner,
	Stack,
	Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import NewIngredient from "../../screens/ingredients/new";
import IngredientDetail from "../../screens/ingredients/detail";
import {
	useCreateIngredient,
	useIngredientsData,
} from "../../hooks/ingredientsHooks";
import headerOptions from "../HeaderOptions";
import { AntDesign } from "@expo/vector-icons";
import Colors from "src/constants/Colors";
import { Modal } from "native-base";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { atom, useRecoilState } from "recoil";
import { newIngredientSheetState } from "src/lib/store/atoms/newIngredient";

const IngredientStack = createNativeStackNavigator();

function IngredientsStack({ navigation }: { navigation: any }) {
	const createIngredient = useCreateIngredient();
	const { isFetching } = useIngredientsData();
	const [dialogOpen, setDialogOpen] = React.useState(true);

	const [show, setShow] = useRecoilState(newIngredientSheetState);

	// ref
	return (
		<IngredientStack.Navigator screenOptions={headerOptions}>
			<IngredientStack.Screen
				name="Ingredients"
				component={Ingredients}
				options={{
					title: "Ingredients",
					headerLeft: () => (
						<>
							{/* <Modal
								isOpen={dialogOpen}
								onClose={() => setDialogOpen(false)}
							>
								<Modal.Content>
									<Modal.CloseButton />
									<Modal.Header>
										Create Ingredient
									</Modal.Header>
									<Modal.Body>
										
									</Modal.Body>
									<Modal.Footer>
										<Button>Submit</Button>
									</Modal.Footer>
								</Modal.Content>
							</Modal> */}
							{createIngredient.isPending || isFetching ? (
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
									onPress={
										() =>
											// createIngredient.mutate({
											// name: "New Ingredient",
											// categoryId: 1,
											// })
											setShow(true)
										// setDialogOpen(true)
									}
								/>
							)}
						</>
					),
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
				options={{ title: "" }}
			/>
		</IngredientStack.Navigator>
	);
}
export default IngredientsStack;
