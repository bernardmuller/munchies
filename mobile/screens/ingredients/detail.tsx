import {
	Box,
	CheckIcon,
	FormControl,
	IconButton,
	Input,
	Select,
	Stack,
	Text,
	VStack,
	WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import { View } from "../../components/Themed";
import {
	useIngredientData,
	useUpdateIngredient,
} from "../../hooks/ingredientsHooks";
import { ActivityIndicator } from "react-native";
import type { Category } from "../../constants/ingredientCategories";
import { categories } from "../../constants/ingredientCategories";
import AppBar from "@/components/app-bar/Appbar";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useThemeProvider";

export default function IngredientDetail({ navigation, route }: any) {
	const { ingredientId } = route.params;
	const { theme } = useTheme();
	const { data, isLoading } = useIngredientData(ingredientId);
	const updateIngredient = useUpdateIngredient({ ingredientId });

	const handleUpdateName = (updateData: { name: string }) => {
		updateIngredient.mutate({
			id: ingredientId,
			...updateData,
		});
	};

	if (isLoading) return <ActivityIndicator />;
	return (
		<>
			<AppBar>
				<IconButton
					icon={
						<AntDesign
							name="arrowleft"
							size={24}
							color={theme.colors.text.default}
						/>
					}
					onPress={() => navigation.goBack()}
				/>
			</AppBar>
			<Stack
				px={4}
				pt={4}
				backgroundColor={theme.colors.background_dark}
				h="full"
			>
				<Name name={data.name} onUpdateName={handleUpdateName} />
				<Text color="gray.400">
					{/* Created: {format(new Date(data.createdAt), "qo MMMM uuu")} */}
				</Text>
				<FormControl mt={3} zIndex={100}>
					<FormControl.Label>Category</FormControl.Label>
					<Select
						accessibilityLabel="- Select Category -"
						placeholder="- Select Category -"
						_selectedItem={{
							endIcon: <CheckIcon size={5} />,
							color: theme.colors.text.default,
						}}
						_actionSheetContent={{
							backgroundColor: theme.colors.white,
							color: theme.colors.text.default,
						}}
						_actionSheetBody={{
							color: theme.colors.text.default,
						}}
						_light={{
							backgroundColor: theme.colors.background_light,
							color: theme.colors.text.default,
							borderColor: theme.colors.background_dark,
						}}
						mt="1"
						defaultValue={String(
							categories.find((c) => c.id === data.categoryId)
								?.id!
						)}
						onValueChange={(itemValue) => {
							updateIngredient.mutate({
								id: ingredientId,
								data: { categoryId: Number(itemValue) },
							});
						}}
						height={16}
						fontSize="md"
						zIndex={100}
						color={theme.colors.text.default}
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
		</>
	);
}

const Name = ({ name, onUpdateName }: any) => {
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(name || "");
	const [error, setError] = useState(false);
	const { theme } = useTheme();

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
				{edit && <FormControl.Label>Ingredient Name</FormControl.Label>}
				<Input
					color={theme.colors.text.default}
					type="text"
					w="100%"
					h={16}
					mb={1}
					autoFocus
					fontSize="md"
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
