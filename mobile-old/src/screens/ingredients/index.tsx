import { RefreshControl, SafeAreaView } from "react-native";
import {
	useCreateIngredient,
	useIngredientsData,
} from "../../hooks/ingredientsHooks";
import {
	Button,
	CheckIcon,
	FlatList,
	FormControl,
	HStack,
	Input,
	Select,
	Stack,
	Text,
} from "native-base";
import ListItem from "../../components/common/ListItem";
import { Ingredient } from "src/lib/http/endpoints/getAllIngredients";
import { useEffect, useRef, useState } from "react";
import Colors from "src/constants/Colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import type { Category } from "../../constants/ingredientCategories";
import { categories } from "../../constants/ingredientCategories";
import BackdropComponent from "../../components/backdrop";
import { useRecoilState } from "recoil";
import { newIngredientSheetState } from "src/lib/store/atoms/newIngredient";

function Ingredients({ navigation }: { navigation: any }) {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [show, setShow] = useRecoilState(newIngredientSheetState);
	const createIngredient = useCreateIngredient();
	const [ingredientError, setIngredientError] = useState({
		name: false,
	});

	const { data, refetch } = useIngredientsData();
	const [search, setSearch] = useState("");
	const [newIngredient, setNewIngredient] = useState({
		name: "",
		categoryId: 0,
	});
	useEffect(() => {
		if (show) {
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [show]);

	const handleNewIngredient = () => {
		if (!newIngredient.name) {
			setIngredientError({
				name: true,
			});
			return;
		}
		createIngredient.mutate({
			name: newIngredient.name,
			categoryId: newIngredient.categoryId ?? 1,
		});
		setNewIngredient({
			name: "",
			categoryId: 0,
		});
		setShow(false);
	};
	return (
		<>
			<BottomSheetModal
				snapPoints={["20%", "60%", "85%"]}
				ref={bottomSheetModalRef}
				index={1}
				backdropComponent={(props) => <BackdropComponent {...props} />}
				onDismiss={() => {
					setShow(false);
				}}
			>
				<BottomSheetView>
					<Stack px={4}>
						<Text fontSize={24} fontWeight="bold" py={2}>
							Create Ingredient
						</Text>
						<FormControl isInvalid={ingredientError.name}>
							<FormControl.Label>Name</FormControl.Label>
							<Input
								height={16}
								fontSize={16}
								value={newIngredient.name}
								onChange={(e) => {
									setNewIngredient({
										...newIngredient,
										name: e.nativeEvent.text,
									});
								}}
								placeholder="Ingredient name..."
								onFocus={() => {
									bottomSheetModalRef.current?.snapToIndex(2);
								}}
								onBlur={() => {
									bottomSheetModalRef.current?.snapToIndex(1);
								}}
							/>
							<FormControl.ErrorMessage>
								Please enter a valid ingredient name
							</FormControl.ErrorMessage>
						</FormControl>
						<FormControl isInvalid={false} mt={3}>
							<FormControl.Label>Category</FormControl.Label>
							<Select
								accessibilityLabel="- Select Category -"
								placeholder="Select Category"
								_selectedItem={{
									bg: "teal.600",
									endIcon: <CheckIcon size={5} />,
								}}
								mt="1"
								onValueChange={(itemValue) => {
									setNewIngredient({
										...newIngredient,
										categoryId: parseInt(itemValue),
									});
								}}
								height={16}
								fontSize="md"
							>
								{categories.map((category: Category) => (
									<Select.Item
										key={category.id}
										label={category.name}
										value={String(category.id)}
									/>
								))}
							</Select>
						</FormControl>
					</Stack>
					<Stack p={4} pt={8}>
						<Button
							height={16}
							rounded="full"
							backgroundColor={Colors.primary[500]}
							onPress={handleNewIngredient}
						>
							Create
						</Button>
					</Stack>
				</BottomSheetView>
			</BottomSheetModal>
			<SafeAreaView>
				<HStack p={2} py={4} bgColor="white" shadow="lg" zIndex={1}>
					<Input
						placeholder="Search ingredient..."
						height={16}
						flex={1}
						mr={2}
						value={search}
						onChange={(e) => setSearch(e.nativeEvent.text)}
						fontSize={16}
					/>
					<Button
						color={Colors.light.background}
						bgColor={Colors.secondary[700]}
						onPress={() => {
							setSearch("");
						}}
						width={20}
						rounded="lg"
					>
						Clear
					</Button>
				</HStack>
				<FlatList
					pt={1}
					height="100%"
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={() => {
								refetch();
							}}
						/>
					}
					data={data?.data?.filter((i: Ingredient) =>
						i.name.toLowerCase().includes(search.toLowerCase())
					)}
					renderItem={(item) => (
						<ListItem
							onPress={() =>
								navigation.navigate("IngredientDetail", {
									ingredientId: item.item.id,
								})
							}
							label={item.item.name}
							key={item.item.id}
						/>
					)}
					mb={16}
				/>
			</SafeAreaView>
		</>
	);
}

export default Ingredients;
