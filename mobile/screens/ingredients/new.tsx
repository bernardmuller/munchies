import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { Input, InputGroup } from "native-base";
import TextInput from "../../components/inputs/text";
import { useForm } from "react-hook-form";

function NewIngredient({ navigation }: { navigation: any }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// resolver: zodResolver(validationSchema),
	});
	return (
		<View className="grid gap-1 mt-1">
			<Text>New Ingredient</Text>
			<Text>Ingredient Name</Text>
			<TextInput
				label="Name"
				name="name"
				placeholder="Enter name..."
				control={control}
			/>
		</View>
	);
}

export default NewIngredient;
