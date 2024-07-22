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
	IconButton,
	Input,
	Select,
	Stack,
	Text,
} from "native-base";
import ListItem from "../../components/common/ListItem";
import { Ingredient } from "@/lib/http/endpoints/getAllIngredients";
import { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import type { Category } from "../../constants/ingredientCategories";
import { categories } from "../../constants/ingredientCategories";
import BackdropComponent from "../../components/backdrop";
import { AntDesign } from "@expo/vector-icons";
import AppBar from "@/components/app-bar/Appbar";
import { useTheme } from "@/hooks/useThemeProvider";

function Ingredients({ navigation }: { navigation: any }) {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { theme } = useTheme();
	const [show, setShow] = useState(false);
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
						<Text
							fontSize={24}
							fontWeight="bold"
							py={2}
							color={theme.colors.black}
						>
							Create Ingredient
						</Text>
						<FormControl isInvalid={ingredientError.name}>
							<FormControl.Label>Name</FormControl.Label>
							<Input
								height={12}
								fontSize={14}
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
								rounded="full"
								pl={4}
								borderColor={theme.colors.text.muted}
								color={theme.colors.text.contrast}
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
								height={12}
								fontSize={14}
								rounded="full"
								pl={4}
								_actionSheetContent={{
									backgroundColor: theme.colors.white,
								}}
								_actionSheetBody={{
									backgroundColor: theme.colors.white,
								}}
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
						<Button rounded="full" onPress={handleNewIngredient}>
							Create
						</Button>
					</Stack>
				</BottomSheetView>
			</BottomSheetModal>
			<AppBar>
				<HStack
					w="full"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text fontSize={20} fontWeight="bold">
						Ingredients
					</Text>
					<IconButton
						icon={
							<AntDesign
								name="pluscircleo"
								size={28}
								color={theme.colors.white}
							/>
						}
						onPress={async () => {
							setShow(true);
						}}
					/>
				</HStack>
			</AppBar>
			<SafeAreaView>
				<Stack backgroundColor={theme.colors.background_dark}>
					<HStack
						p={1}
						px={3}
						pb={3}
						backgroundColor={theme.colors.background}
						zIndex={1}
					>
						<HStack width="full" position="relative">
							<Input
								placeholder="Search ingredient..."
								height={12}
								flex={1}
								mx={1}
								value={search}
								onChange={(e) => setSearch(e.nativeEvent.text)}
								fontSize={14}
								rounded="full"
								paddingLeft={4}
								borderColor={theme.colors.background_light}
								backgroundColor={theme.colors.background_dark}
								color={theme.colors.text.default}
							/>
							{search.length > 0 && (
								<IconButton
									position={"absolute"}
									right={0}
									mr={3}
									mt="2px"
									icon={
										<AntDesign
											name="close"
											size={16}
											color={theme.colors.text.muted}
										/>
									}
									onPress={() => {
										setSearch("");
									}}
								/>
							)}
						</HStack>
					</HStack>
					<FlatList
						p={3}
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
				</Stack>
			</SafeAreaView>
		</>
	);
}

export default Ingredients;
