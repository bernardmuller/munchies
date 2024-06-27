import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../components/inputs/text";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth";
import { z } from "zod";
import {
	Button,
	FormControl,
	IconButton,
	Input,
	Link,
	Stack,
	Text,
	WarningOutlineIcon,
} from "native-base";
import Colors from "../constants/Colors";
import { TiEye } from "react-icons/ti";
import { AntDesign, Feather } from "@expo/vector-icons";

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
		console.log(response);
		if (response?.token) {
			await saveToken(response.token);
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
	const [showPassword, setShowPassword] = useState(false);
	const { signIn, loading } = useLoginHandler();
	const onSubmit = async (data: any) => {
		// console.log("DATA => ", data);
		await signIn(data);
	};

	return (
		<Stack>
			<Stack
				pt={75}
				height={200}
				width="100%"
				backgroundColor={Colors.light.tint}
				alignItems="center"
			>
				<Text fontSize="4xl" fontWeight="semibold" color={Colors.white}>
					Munchies
				</Text>
				<Text fontSize="xl" color={Colors.white}>
					Login
				</Text>
			</Stack>
			<Stack p={4} isInvalid={errors.email ? true : false}>
				<FormControl>
					<FormControl.Label>Email</FormControl.Label>
					<TextInput
						control={control}
						name="email"
						label="email"
						placeholder="eg. me@domain.com"
					/>
					{errors.email && (
						<FormControl.ErrorMessage
							leftIcon={<WarningOutlineIcon size="xs" />}
						>
							{errors?.email?.message}
						</FormControl.ErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={errors.password ? true : false}>
					<FormControl.Label>Password</FormControl.Label>

					<TextInput
						placeholder="eg. ***********"
						secure
						name="password"
						label="password"
						control={control}
					/>

					{errors.password && (
						<FormControl.ErrorMessage
							leftIcon={<WarningOutlineIcon size="xs" />}
						>
							{errors?.password?.message}
						</FormControl.ErrorMessage>
					)}
				</FormControl>
			</Stack>
			<Stack p={2} px={4}>
				<Button
					onPress={handleSubmit(onSubmit)}
					isLoading={loading}
					borderRadius={10}
					height={50}
					backgroundColor={Colors.primary[500]}
					_focus={{ backgroundColor: Colors.primary[600] }}
				>
					Login
				</Button>
				<Stack direction="row" p={4} justifyContent="center">
					<Text>Need an account? </Text>

					<Link>Sign up</Link>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default Login;
