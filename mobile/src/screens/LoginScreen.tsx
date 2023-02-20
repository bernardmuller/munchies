import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "native-base";
import { login } from "../api/auth";
import Navigation from "src/navigation";

const TextInput = ({
	name,
	placeholder,
	onChange,
	label,
	value,
	secure,
	control,
	onBlur,
	required,
}: {
	name: string;
	label: string;
	placeholder?: (text: string) => void;
	secure?: boolean;
	control: any;
	onBlur?: () => void;
	required?: boolean;
}) => {
	return (
		<Controller
			control={control}
			rules={{
				required: required ? true : false,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<Input
					name={name}
					label={label}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					placeholder={placeholder || ""}
					className="w-full"
				/>
			)}
			name={name}
		/>
	);
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
	const { control, handleSubmit } = useForm();
	const onSubmit = async (data: any) => {
		const loginResponse = await login(data);
		if (loginResponse["token"]) {
			navigation.navigate("Home");
		}

		// console.log("login response", loginResponse);
		console.log(navigation);
	};
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text>Munchies</Text>
				<Text>Login</Text>
				<TextInput
					name="email"
					control={control}
					placeholder="Enter Email..."
					label="Email"
				/>
				<TextInput
					name="password"
					control={control}
					placeholder="Enter Password..."
					label="Password"
				/>
				<Button onPress={handleSubmit(onSubmit)}>Log in</Button>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 30,
	},
});
