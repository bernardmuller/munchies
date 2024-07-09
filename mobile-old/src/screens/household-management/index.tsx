import { ActivityIndicator, SafeAreaView } from "react-native";
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
} from "native-base";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
	useCreateHousehold,
	useCurrentUserHousold,
	useJoinHousehold,
	useLeaveHousehold,
} from "../../hooks/householdHooks";
import { useForm } from "react-hook-form";
import TextInput from "src/components/inputs/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { set } from "lodash";

const validationSchema = z.object({
	householdId: z.string().min(1, { message: "Household ID is required" }),
});

export default function HouseholdManagementScreen({ route }: { route: any }) {
	const [showJoin, setShowJoin] = useState(false);
	const [joinError, setJoinError] = useState("");
	const formMethods = useForm({
		defaultValues: {
			householdId: "",
		},
		resolver: zodResolver(validationSchema),
	});

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
					console.log("errrorrrr");
					setJoinError(error.message);
				},
			}
		);
	};

	if (showJoin) {
		return (
			<Stack p={4}>
				<Stack p={4} bgColor="white" rounded="lg" shadow="lg" mb={4}>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						pb={2}
						pr={3}
					>
						<Text fontSize={16}>My Household</Text>
					</HStack>

					<Stack space={2}>
						<FormControl>
							<FormControl.Label>Household ID</FormControl.Label>
							<Input
								{...formMethods.register("householdId")}
								onChange={(e) => {
									setJoinError("");
									formMethods.setValue(
										"householdId",
										e.nativeEvent.text
									);
								}}
							/>
						</FormControl>
						{joinError && joinError.length > 0 && (
							<HStack alignItems="center" space={1}>
								<WarningOutlineIcon size="xs" color="red.500" />
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
		);
	}

	if (!currentHousehold.data?.data?.id)
		return (
			<Stack p={4}>
				<Stack p={4} bgColor="white" rounded="lg" shadow="lg" mb={4}>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						pb={2}
						pr={3}
					>
						<Text fontSize={16}>My Household</Text>
					</HStack>

					<Stack space={2}>
						<Button
							onPress={() => {
								createHousehold.mutate();
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
		);
	return (
		<>
			<SafeAreaView>
				<Stack p={4}>
					<Stack
						p={4}
						bgColor="white"
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
							<AntDesign
								name="delete"
								size={20}
								onPress={() => {
									// console.log("leave household");
									leaveHousehold.mutate({
										id: currentHousehold.data?.data
											?.id as string,
									});
								}}
							/>
						</HStack>

						<Stack
							direction={"row"}
							justifyContent="space-between"
							alignItems="center"
							rounded="lg"
							bgColor="gray.300"
							p={3}
						>
							<Text>
								{currentHousehold.data?.data?.id
									.slice(0, 24)
									.concat("...")}
							</Text>
							<AntDesign name="copy1" size={20} />
						</Stack>
					</Stack>
					<Text fontSize={16} fontWeight="semibold">
						Members
					</Text>
					<Divider my={1} />
					<FlatList
						data={currentHousehold.data?.data?.members}
						// ListEmptyComponent={() => {
						// 	return (
						// 		<Box
						// 			borderBottomColor={"gray.200"}
						// 			borderBottomWidth={1}
						// 		>
						// 			<Text
						// 				color={"gray.500"}
						// 				width="full"
						// 				textAlign="center"
						// 				py={4}
						// 				fontSize={16}
						// 			>
						// 				No items found
						// 			</Text>
						// 		</Box>
						// 	);
						// }}
						renderItem={({ item }: any) => (
							<ListItem key={item.id} item={item} />
						)}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
}

const ListItem = ({ item, onPress }: any) => {
	return (
		<>
			<Stack direction="row" alignItems="center" px={4} py={2}>
				<Box mr={4}>
					<AntDesign name="user" size={30} />
				</Box>
				<Stack>
					<Text fontSize={18}>
						{item.firstName} {item.lastName}
					</Text>
					<Text fontSize={14}>{item.email}</Text>
				</Stack>
			</Stack>
			<Divider my={1} />
		</>
	);
};
