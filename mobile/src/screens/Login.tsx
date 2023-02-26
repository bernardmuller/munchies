import {
	View,
	Text,
	Button,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "../components/inputs/text";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth";
import { z } from "zod";

const validationSchema = z.object({
	email: z.string().min(1, { message: "Email is required" }).email({
		message: "Must be a valid email",
	}),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const useLoginHandler = () => {
	const [loading, setLoading] = useState(false);
	const { saveToken } = useContext(AuthContext);

	const signIn = async (data: { email: string; password: string }) => {
		setLoading(true);
		const response = await login({
			email: data.email,
			password: data.password,
		});
		if (response?.token) {
			await saveToken(response);
		}
		setLoading(false);
	};

	return {
		loading,
		signIn,
	};
};

function Login({ navigation }: { navigation: any }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(validationSchema),
	});
	const { signIn, loading } = useLoginHandler();
	const onSubmit = async (data: any) => {
		await signIn(data);
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
				{errors.email && <Text>{errors?.email?.message}</Text>}
				<TextInput
					name="password"
					control={control}
					placeholder="Enter Password..."
					label="Password"
				/>
				{errors.password && <Text>{errors?.password?.message}</Text>}
				<View className="w-full flex justify-center">
					{loading ? (
						<ActivityIndicator size={30} />
					) : (
						<Button
							onPress={handleSubmit(onSubmit)}
							title={"Log in"}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 30,
	},
});

export default Login;
