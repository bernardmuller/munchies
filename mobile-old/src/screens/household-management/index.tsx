import { SafeAreaView } from "react-native";
import {
	Box,
	Stack,
	Text,
	FlatList,
	Divider,
	HStack,
	Button,
	Input,
	FormControl,
	WarningOutlineIcon,
	IconButton,
} from "native-base";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
	useCreateHousehold,
	useCurrentUserHousold,
	useJoinHousehold,
	useLeaveHousehold,
} from "../../hooks/householdHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppBar from "src/components/app-bar/Appbar";
import { useTheme } from "src/hooks/useThemeProvider";
import { useNavigation } from "@react-navigation/native";

const validationSchema = z.object({
	householdId: z.string().min(1, { message: "Household ID is required" }),
});

const Header = () => {
	const { theme } = useTheme();
	const navigation = useNavigation();
	return (
		<AppBar>
			<IconButton
				icon={
					<AntDesign
						name="arrowleft"
						size={24}
						color={theme.colors.text.default}
					/>
				}
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</AppBar>
	);
};

export default function HouseholdManagementScreen({ route }: { route: any }) {
	const [showJoin, setShowJoin] = useState(false);
	const [joinError, setJoinError] = useState("");
	const formMethods = useForm({
		defaultValues: {
			householdId: "",
		},
		resolver: zodResolver(validationSchema),
	});

	const { theme } = useTheme();

	const currentHousehold = useCurrentUserHousold();
	const createHousehold = useCreateHousehold();
	const joinHousehold = useJoinHousehold();
	const leaveHousehold = useLeaveHousehold();

	const handleJoinHousehold = async () => {
		if (formMethods.getValues("householdId") === "") {
			setJoinError("Please enter a valid household ID");
			return;
		}
		const validation = validationSchema.safeParse(formMethods.getValues());

		if (!validation.success) {
			setJoinError("Please enter a valid household ID");
			return;
		}
		await joinHousehold.mutateAsync(
			{
				id: formMethods.getValues().householdId,
			},
			{
				onSuccess: () => {
					setShowJoin(false);
				},
				onError: (error) => {
					setJoinError(error.message);
				},
			}
		);
	};

	if (showJoin) {
		return (
			<>
				<Header />
				<Stack
					h="full"
					p={4}
					backgroundColor={theme.colors.background_dark}
				>
					<Stack
						p={4}
						bgColor={theme.colors.background}
						rounded="lg"
						shadow="lg"
						mb={4}
					>
						<HStack
							justifyContent="space-between"
							alignItems="center"
							pb={2}
							pr={3}
						>
							<Text fontSize={16}>My Household</Text>
						</HStack>

						<Stack space={2}>
							<FormControl h={12}>
								<Input
									placeholder="Enter household Id..."
									height={12}
									flex={1}
									fontSize={14}
									rounded="full"
									paddingLeft={4}
									borderColor={theme.colors.background_light}
									backgroundColor={
										theme.colors.background_dark
									}
									{...formMethods.register("householdId")}
									onChange={(e) => {
										setJoinError("");
										formMethods.setValue(
											"householdId",
											e.nativeEvent.text
										);
									}}
									color={theme.colors.text.default}
								/>
							</FormControl>
							{joinError && joinError.length > 0 && (
								<HStack alignItems="center" space={1}>
									<WarningOutlineIcon
										size="xs"
										color="red.500"
									/>
									<Text fontSize={12} color={"red.500"}>
										{joinError}
									</Text>
								</HStack>
							)}
							<Button onPress={handleJoinHousehold}>
								Join Household
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</>
		);
	}

	if (!currentHousehold.data?.data?.id)
		return (
			<>
				<Header />
				<Stack
					h="full"
					p={4}
					backgroundColor={theme.colors.background_dark}
				>
					<Stack
						p={4}
						bgColor={theme.colors.background}
						rounded="lg"
						shadow="lg"
						mb={4}
					>
						<HStack
							justifyContent="space-between"
							alignItems="center"
							p={2}
							pb={4}
						>
							<Text fontSize={18} fontWeight="semibold">
								My Household
							</Text>
						</HStack>

						<Stack space={2}>
							<Button
								onPress={() => {
									createHousehold.mutate();
									// console.log("create household");
								}}
							>
								Create Household
							</Button>
							<Button onPress={() => setShowJoin(true)}>
								Join Household
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</>
		);
	return (
		<>
			<Header />
			<SafeAreaView>
				<Stack
					p={4}
					backgroundColor={theme.colors.background_dark}
					height="full"
				>
					<Stack
						p={4}
						bgColor={theme.colors.background}
						rounded="lg"
						shadow="lg"
						mb={4}
					>
						<HStack
							justifyContent="space-between"
							alignItems="center"
							pb={2}
							pl={2}
						>
							<Text fontSize={16} fontWeight="semibold">
								My Household
							</Text>
							<IconButton
								icon={
									<Feather
										name="log-out"
										size={24}
										color={theme.colors.text.default}
										onPress={() => {
											leaveHousehold.mutate({
												id: currentHousehold.data?.data
													?.id as string,
											});
										}}
									/>
								}
							/>
						</HStack>

						<Stack
							direction={"row"}
							justifyContent="space-between"
							alignItems="center"
							rounded="lg"
							bgColor={theme.colors.background_light}
							p={2}
							pl={5}
						>
							<Text>
								{currentHousehold.data?.data?.id
									.slice(0, 18)
									.concat("...")}
							</Text>
							<IconButton
								icon={
									<AntDesign
										name="copy1"
										size={24}
										color={theme.colors.text.default}
										onPress={() => {
											// console.log("leave household");
											leaveHousehold.mutate({
												id: currentHousehold.data?.data
													?.id as string,
											});
										}}
									/>
								}
							/>
						</Stack>
					</Stack>
					<Text fontSize={16} fontWeight="semibold">
						Members
					</Text>
					<Divider my={1} />
					<FlatList
						data={currentHousehold.data?.data?.members}
						renderItem={({ item }: any) => (
							<ListItem key={item.id} item={item} />
						)}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
}

const ListItem = ({ item }: any) => {
	const { theme } = useTheme();
	return (
		<>
			<Stack direction="row" alignItems="center" px={4} py={2}>
				<Box mr={4}>
					<AntDesign
						name="user"
						size={30}
						color={theme.colors.text.default}
					/>
				</Box>
				<Stack>
					<Text fontSize={18} color={theme.colors.text.default}>
						{item.firstName} {item.lastName}
					</Text>
					<Text fontSize={14} color={theme.colors.text.muted}>
						{item.email}
					</Text>
				</Stack>
			</Stack>
			<Divider my={1} />
		</>
	);
};
