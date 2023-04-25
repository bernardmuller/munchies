import {
	Box,
	CheckIcon,
	FormControl,
	IconButton,
	Input,
	Select,
	Stack,
	Text,
	WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import { View } from "../../components/Themed";
import {
	useIngredientData,
	useUpdateIngredient,
} from "../../hooks/ingredientsHooks";
import { ActivityIndicator } from "react-native";

const categories = [
	{
		id: 1,
		name: "Fruit & Vegetables",
	},
	{
		id: 2,
		name: "Protein",
	},
	{
		id: 3,
		name: "Dairy",
	},
	{
		id: 4,
		name: "Grains",
	},
	{
		id: 5,
		name: "Spices",
	},
	{
		id: 6,
		name: "Other",
	},
];

export default function IngredientDetail({ route }: { route: any }) {
	const { ingredientId } = route.params;
	const { data, isLoading } = useIngredientData(ingredientId);
	const updateIngredient = useUpdateIngredient(ingredientId);
	console.log(data);

	const handleUpdateName = (updateData: { name: string }) => {
		updateIngredient.mutate({
			id: ingredientId,
			data: { ...updateData },
		});
	};

	if (isLoading) return <ActivityIndicator />;
	return (
		<Stack px={4} pt={4}>
			<Name name={data.name} onUpdateName={handleUpdateName} />
			<Text color="gray.400">Created at: {data.createdAt}</Text>
			<FormControl w="3/4" maxW="300" isRequired isInvalid mt={3}>
				<FormControl.Label>Category</FormControl.Label>
				<Select
					minWidth="200"
					accessibilityLabel="- Select Category -"
					placeholder="- Select Category -"
					_selectedItem={{
						bg: "teal.600",
						endIcon: <CheckIcon size={5} />,
					}}
					mt="1"
					defaultValue={String(
						categories.find((c) => c.id === data.categoryId)?.id!
					)}
				>
					{categories.map((category) => (
						<Select.Item
							key={category.id}
							label={category.name}
							value={String(category.id)}
						/>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
}

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
					h="10"
					mb={1}
					fontSize="md"
					variant="underlined"
					defaultValue={text}
					onChange={handleChange}
					onBlur={handleSave}
					InputRightElement={
						<IconButton
							icon={
								<CheckIcon
									size="lg"
									rounded="full"
									w="1/6"
									h="full"
								></CheckIcon>
							}
							onPress={handleSave}
						/>
					}
					placeholder="Enter name..."
				/>
				{error && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size="xs" />}
					>
						Please enter a valid name.
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		</Box>
	);
};
