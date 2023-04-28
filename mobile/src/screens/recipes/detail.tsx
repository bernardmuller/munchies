import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "../../components/common/View";

import { useMealData, useUpdateMeal } from "../../hooks/mealsHooks";
import { z } from "zod";
import { debounce } from "lodash";
// import SearchableDropDown from "react-native-dropdown-searchable";
import { useAddIngredientToMeal } from "../../hooks/ingredientsHooks";
//@ts-ignore
import SearchableDropdown from "react-native-searchable-dropdown";
import { fetchIngredients } from "../../api/ingredients";
import {
	Box,
	FlatList,
	Input,
	useToast,
	Button,
	WarningOutlineIcon,
	FormControl,
	Text,
	Stack,
	IconButton,
	DeleteIcon,
} from "native-base";
import { ScrollView } from "react-native";
import { format } from "date-fns";

const validationSchema = z.object({});

const AddIngredient = ({
	recipeId,
	recipeIngredients,
}: {
	recipeId: string;
	recipeIngredients: any;
}) => {
	// const { data, isFetching } = useIngredientsData();
	const [add, setAdd] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState({
		ingredient: null,
	});
	const addIngredient = useAddIngredientToMeal({
		mealId: recipeId,
		ingredient: selectedIngredient,
	});

	const toast = useToast();

	const getIngredients = async () => {
		setLoading(true);
		// onLoading(true);
		const ingredients = await fetchIngredients({
			searchTerm: searchTerm.toLowerCase() || "",
			page: "1",
		});

		let dropDownOptions = ingredients?.map((item: any) => {
			return { id: item.id, name: item.name };
		});
		setLoading(false);
		setRefresh(true);

		return dropDownOptions;
	};

	useEffect(() => {
		getIngredients().then((res) => {
			setItems(res);
			setRefresh(false);
		});
	}, [searchTerm]);

	useEffect(() => {
		if (selectedIngredient.ingredient !== null) {
			addIngredient.mutate({
				mealId: recipeId,
				ingredient: selectedIngredient,
			});
		}
	}, [selectedIngredient]);

	const updateSearchTerm = (inputValue: string) => setSearchTerm(inputValue);

	const debounceOnChange = debounce(updateSearchTerm, 300);

	if (!items && loading) return <ActivityIndicator size={30} />;

	if (!add)
		return <Button onPress={() => setAdd(true)}>Add Ingredient</Button>;
	return (
		<View className="flex p-1 bg-white mt-1">
			<SearchableDropdown
				onItemSelect={(val: any) => {
					const existing = recipeIngredients.find(
						(ingredient: any) => ingredient.ingredient.id === val.id
					);
					if (existing)
						if (existing) {
							toast.show({
								title: "Ingredient already in recipe",
								variant: "solid",
								placement: "top",
							});
							return;
						}
					setSelectedIngredient({
						ingredient: items.filter(
							(item: any) => item.id === val.id
						)[0],
					});

					setAdd(false);
					setSearchTerm("");
				}}
				containerStyle={{ padding: 5 }}
				// onRemoveItem={(item, index) => {}}
				placeholder="Search ingredient..."
				textInputStyle={{
					padding: 12,
					borderWidth: 1,
					borderColor: "#ccc",
					borderRadius: 5,
				}}
				itemStyle={{
					padding: 10,
					marginTop: 2,
					backgroundColor: "#eee",
					borderColor: "#bbb",
					borderWidth: 1,
					borderRadius: 5,
				}}
				itemTextStyle={{ color: "#222" }}
				itemsContainerStyle={{ maxHeight: 140 }}
				items={
					!refresh &&
					items.filter((item1) => {
						for (const item2 in recipeIngredients) {
							if (item2?.ingredient?.id !== item1.id) {
								return item1;
							}
						}
					})
				}
				defaultIndex={2}
				resetValue={false}
				textInputProps={{
					onTextChange: (text: string) => {
						debounceOnChange(text);
						setItems([]);
					},
				}}
				listProps={{
					nestedScrollEnabled: true,
				}}
			/>
			{loading && <ActivityIndicator size={30} />}
			<Button title="Cancel" onPress={() => setAdd(false)} color="grey" />
		</View>
	);
};

function RecipeDetail({ route, navigation }: { route: any; navigation: any }) {
	const { recipeId } = route.params;
	const { data, isFetching } = useMealData(recipeId);
	const updateMeal = useUpdateMeal({ mealId: recipeId });
	if (!data && isFetching) return <ActivityIndicator size={30} />;
	console.log("RECIPE => ", JSON.stringify(data, null, 2));
	return (
		<ScrollView className="p-2 ">
			<Name
				name={data.name}
				onUpdateName={(updateData: { name: string }) => {
					updateMeal.mutate({
						id: recipeId,
						data: { ...updateData },
					});
				}}
			/>
			<Text color="gray.400">
				Created: {format(new Date(data.createdAt), "qo MMMM uuu")}
			</Text>
			<View className="pt-3">
				<Text fontSize="lg" fontWeight="semibold" pb={2}>
					Ingredients
				</Text>
				<FlatList
					data={data.ingredients}
					renderItem={(ingredient: any) => (
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							bg="white"
							p={3}
							borderRadius={10}
							mb={2}
						>
							<Text
								key={`ingredient-${ingredient?.ingredient?.ingredient?.id}`}
							>
								{ingredient?.item?.name}
							</Text>
							<IconButton icon={<DeleteIcon />} />
						</Stack>
					)}
				/>
			</View>
			<Button
				mb={2}
				onPress={() =>
					navigation.navigate("AddIngredients", {
						recipeId: recipeId,
					})
				}
			>
				Add Recipe
			</Button>
			{/* <AddIngredient
				recipeId={recipeId}
				recipeIngredients={data.ingredients}
			/> */}
		</ScrollView>
	);
}

export default RecipeDetail;

const Name = ({ name, onUpdateName }: any) => {
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(name || "");
	const [error, setError] = useState(false);

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const handleChange = (e: any) => {
		setError(false);
		setText(e.nativeEvent.text);
	};

	const handleSave = () => {
		if (!text) {
			setError(true);
			return;
		}
		toggleEdit();
		onUpdateName({ name: text });
	};

	if (!edit) {
		return (
			<Stack>
				<Text fontSize="2xl" fontWeight="semibold" onPress={toggleEdit}>
					{text}
				</Text>
			</Stack>
		);
	}

	return (
		<Box alignItems="center py-2">
			<FormControl isInvalid={error}>
				<Input
					type="text"
					w="100%"
					defaultValue={text}
					onChange={handleChange}
					onBlur={handleSave}
					InputRightElement={
						<Button
							size="xs"
							rounded="none"
							w="1/6"
							h="full"
							onPress={handleSave}
						>
							Save
						</Button>
					}
					placeholder="Enter name..."
				/>
				{error && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size="xs" />}
					>
						Please enter a valid recipe name.
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		</Box>
	);
};
