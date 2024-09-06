import { Button, TextInput, View, StyleSheet } from "react-native";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import React from "react";
import { registerUser } from "@/api/auth";

const Register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { getToken, userId } = useAuth();

	const [emailAddress, setEmailAddress] = useState("me@bernardmuller.co.za");
	const [password, setPassword] = useState("!@#Tester123");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);

	// Create the user and send the verification email
	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			const signUpRes = await signUp.create({
				emailAddress,
				password,
			});

			// Send verification Email
			const prep = await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	// Verify the email address
	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification(
				{
					code,
				}
			);

			const registerUserOnBackend = await registerUser({
				userId: completeSignUp.createdUserId as string,
			});

			const token = await getToken();
			console.log("token => ", token);

			console.log("registerUserOnBackend => ", registerUserOnBackend);

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ headerBackVisible: !pendingVerification }}
			/>
			<Spinner visible={loading} />

			{!pendingVerification && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="simon@galaxies.dev"
						value={emailAddress}
						onChangeText={setEmailAddress}
						style={styles.inputField}
					/>
					<TextInput
						placeholder="password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={styles.inputField}
					/>

					<Button
						onPress={onSignUpPress}
						title="Sign up"
						color={"#6c47ff"}
					></Button>
				</>
			)}

			{pendingVerification && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={styles.inputField}
							onChangeText={setCode}
						/>
					</View>
					<Button
						onPress={onPressVerify}
						title="Verify Email"
						color={"#6c47ff"}
					></Button>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: "#6c47ff",
		borderRadius: 4,
		padding: 10,
		backgroundColor: "#fff",
	},
	button: {
		margin: 8,
		alignItems: "center",
	},
});

export default Register;
