import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "../../components/common/View";
import { Text } from "../../components/common/Text";

import { useMealData } from "../../hooks/mealsHooks";
import { Button } from "../../components/common/Button";
import TextInput from "../../components/inputs/text";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { debounce } from "lodash";
// import SearchableDropDown from "react-native-dropdown-searchable";
import {
	useAddIngredientToMeal,
	useIngredientsData,
} from "../../hooks/ingredientsHooks";
//@ts-ignore
import SearchableDropdown from "react-native-searchable-dropdown";
import { fetchIngredients } from "../../api/ingredients";
import { useQueryClient } from "@tanstack/react-query";
import { FlatList, useToast } from "native-base";
import { ScrollView } from "react-native";

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
			console.log("fetched => ", res);
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
		return <Button title="Add ingredient" onPress={() => setAdd(true)} />;
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

function RecipeDetail({ route }: { route: any }) {
	const { data, isFetching } = useMealData(route.params.recipeId);
	const { recipeId } = route.params;
	if (!data && isFetching) return <ActivityIndicator size={30} />;
	console.log("data => ", data);
	return (
		<ScrollView className="p-2 ">
			<Text className="text-xl">{data.name}</Text>
			<View className="pt-3">
				<Text className="text-lg">Ingredients:</Text>
				<View className="grid gap-1">
					{data.ingredients.map((ingredient: any) => (
						<></>
					))}
				</View>
				<FlatList
					data={data.ingredients}
					renderItem={(ingredient: any) => (
						<>
							<Text
								key={
									ingredient?.item?.ingredient?.id +
									Math.floor(Math.random())
								}
								className="py-2 px-3 w-full bg-white"
							>
								{ingredient?.item?.ingredient?.name}
							</Text>
						</>
					)}
				/>
			</View>
			<AddIngredient
				recipeId={recipeId}
				recipeIngredients={data.ingredients}
			/>
		</ScrollView>
	);
}

export default RecipeDetail;
