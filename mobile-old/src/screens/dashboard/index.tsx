import {
	RefreshControl,
	SafeAreaView,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import {
	Box,
	Button,
	Stack,
	Text,
	FlatList,
	Divider,
	Input,
	View,
	Pressable,
	useColorModeValue,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { useCheckItem, useCreateItem, useUnCheckItem } from "../../hooks/items";
import { AntDesign } from "@expo/vector-icons";
import { useNewestGrocerylist } from "../../hooks/grocerylistHooks";
import { useIngredientsData } from "src/hooks/ingredientsHooks";
import Colors from "src/constants/Colors";
import { Grocerylist, Item } from "src/lib/http/endpoints/getAllGrocerylists";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BackdropComponent from "../../components/backdrop";
import { useCurrentUserHousold } from "src/hooks/householdHooks";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { Household } from "src/lib/http/endpoints/getHousholdById";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MyGrocerylistTabProps = {
	grocerylist: Grocerylist | null;
	household: Household | null;
	onRefetch: () => void;
	type: "grocerylist" | "household";
	navigation: any;
};

const HouseholdTab = ({
	household,
	onRefetch,
	navigation,
}: MyGrocerylistTabProps) => {
	const [show, setShow] = useState(false);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [search, setSearch] = useState("");

	const createItemMutation = useCreateItem(
		household?.grocerylist?.id as string
	);
	const ingredients = useIngredientsData();
	const checkItemMutation = useCheckItem(
		household?.grocerylist?.id as string
	);
	const unCheckItemMutation = useUnCheckItem(
		household?.grocerylist?.id as string
	);

	useEffect(() => {
		if (show) {
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [show]);

	if (!household) {
		return (
			<Stack p={4} space={4}>
				<Text textAlign="center" py={3} px={8} color="gray.400">
					You can create and share a grocerylist with your household
				</Text>
				<Button
					onPress={() => {
						navigation.navigate("HouseholdManagement");
					}}
				>
					Go to Household Management
				</Button>
			</Stack>
		);
	}

	if (!household.grocerylist)
		return (
			<Text textAlign="center" py={3} color="gray.400">
				No Grocerylist found
			</Text>
		);

	// if (!grocerylist?.data && isRefetching)
	// return <ActivityIndicator size={30} />;
	return (
		<>
			<BottomSheetModal
				snapPoints={["20%", "60%", "95%"]}
				ref={bottomSheetModalRef}
				index={1}
				backdropComponent={(props) => <BackdropComponent {...props} />}
				onDismiss={() => {
					setShow(false);
				}}
			>
				<BottomSheetView>
					<Box p={4}>
						<Input
							value={search}
							onChange={(e) => setSearch(e.nativeEvent.text)}
							onFocus={() => {
								bottomSheetModalRef.current?.snapToIndex(2);
							}}
							onBlur={() => {
								bottomSheetModalRef.current?.snapToIndex(1);
							}}
							placeholder="Search item..."
							height={16}
							fontSize={16}
							mb={2}
						/>
						<FlatList
							data={ingredients?.data?.data?.filter((item) =>
								item.name
									.toLowerCase()
									.includes(search.toLowerCase())
							)}
							ListEmptyComponent={() => {
								return (
									<Box
										borderBottomColor={"gray.200"}
										borderBottomWidth={1}
									>
										<Text
											color={"gray.500"}
											width="full"
											textAlign="center"
											py={4}
											fontSize={16}
										>
											No items found
										</Text>
									</Box>
								);
							}}
							renderItem={({ item, index }) => {
								return (
									<Button
										key={item.id}
										p={4}
										textAlign="center"
										width="full"
										rounded={0}
										borderTopColor={"gray.200"}
										borderTopWidth={index === 0 ? 1 : 0}
										borderBottomColor={"gray.200"}
										borderBottomWidth={1}
										bgColor={"white"}
										onPress={async () => {
											await createItemMutation.mutateAsync(
												{
													name: item.name,
													check: false,
													ingredientId: item.id,
													grocerylistId: household
														?.grocerylist
														?.id as string,
												}
											);
										}}
									>
										<Box width="full">
											<Text fontSize={18}>
												{item.name}
											</Text>
										</Box>
									</Button>
								);
							}}
						/>
					</Box>
				</BottomSheetView>
			</BottomSheetModal>
			<SafeAreaView>
				<Stack p={2} height={"full"} justifyContent="space-between">
					<FlatList
						data={household?.grocerylist?.items?.sort(
							(a: Item, b: Item) => {
								if (a.createdAt < b.createdAt) {
									return 1;
								} else if (a.createdAt > b.createdAt) {
									return -1;
								} else {
									return 0;
								}
							}
						)}
						refreshControl={
							<RefreshControl
								refreshing={false}
								onRefresh={() => {
									onRefetch();
								}}
							/>
						}
						ListEmptyComponent={() => {
							return (
								<Box
									borderBottomColor={"gray.200"}
									borderBottomWidth={1}
								>
									<Text
										color={"gray.500"}
										width="full"
										textAlign="center"
										py={4}
										fontSize={16}
									>
										No items found
									</Text>
								</Box>
							);
						}}
						renderItem={({ item }: any) => (
							<ListItem
								type="h"
								key={item.id}
								item={item}
								onPress={() => {
									if (item.check) {
										unCheckItemMutation.mutate(item.id);
									} else {
										checkItemMutation.mutate(item.id);
									}
								}}
							/>
						)}
					/>
					{!!household.grocerylist && (
						<Box py={2}>
							<Button
								height={16}
								rounded="full"
								bgColor={Colors.light.CTA}
								onPress={() => setShow(true)}
							>
								<Text
									color="white"
									fontWeight="semibold"
									fontSize={16}
								>
									Add Item
								</Text>
							</Button>
						</Box>
					)}
				</Stack>
			</SafeAreaView>
		</>
	);
};

const GrocerylistTab = ({
	grocerylist,
	onRefetch,
	navigation,
}: MyGrocerylistTabProps) => {
	const [show, setShow] = useState(false);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [search, setSearch] = useState("");

	const createItemMutation = useCreateItem(grocerylist?.id as string);
	const ingredients = useIngredientsData();
	const checkItemMutation = useCheckItem(grocerylist?.id as string);
	const unCheckItemMutation = useUnCheckItem(grocerylist?.id as string);

	useEffect(() => {
		if (show) {
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [show]);

	if (!grocerylist)
		return (
			<Text textAlign="center" py={3} color="gray.400">
				No Grocerylist found
			</Text>
		);

	// if (!grocerylist?.data && isRefetching)
	// return <ActivityIndicator size={30} />;
	return (
		<>
			<BottomSheetModal
				snapPoints={["20%", "60%", "95%"]}
				ref={bottomSheetModalRef}
				index={1}
				backdropComponent={(props) => <BackdropComponent {...props} />}
				onDismiss={() => {
					setShow(false);
				}}
			>
				<BottomSheetView>
					<Box p={4}>
						<Input
							value={search}
							onChange={(e) => setSearch(e.nativeEvent.text)}
							onFocus={() => {
								bottomSheetModalRef.current?.snapToIndex(2);
							}}
							onBlur={() => {
								bottomSheetModalRef.current?.snapToIndex(1);
							}}
							placeholder="Search item..."
							height={16}
							fontSize={16}
							mb={2}
						/>
						<FlatList
							data={ingredients?.data?.data?.filter((item) =>
								item.name
									.toLowerCase()
									.includes(search.toLowerCase())
							)}
							ListEmptyComponent={() => {
								return (
									<Box
										borderBottomColor={"gray.200"}
										borderBottomWidth={1}
									>
										<Text
											color={"gray.500"}
											width="full"
											textAlign="center"
											py={4}
											fontSize={16}
										>
											No items found
										</Text>
									</Box>
								);
							}}
							renderItem={({ item, index }) => {
								return (
									<Button
										key={item.id}
										p={4}
										textAlign="center"
										width="full"
										rounded={0}
										borderTopColor={"gray.200"}
										borderTopWidth={index === 0 ? 1 : 0}
										borderBottomColor={"gray.200"}
										borderBottomWidth={1}
										bgColor={"white"}
										onPress={async () => {
											await createItemMutation.mutateAsync(
												{
													name: item.name,
													check: false,
													ingredientId: item.id,
													grocerylistId:
														grocerylist?.id as string,
												}
											);
										}}
									>
										<Box width="full">
											<Text fontSize={18}>
												{item.name}
											</Text>
										</Box>
									</Button>
								);
							}}
						/>
					</Box>
				</BottomSheetView>
			</BottomSheetModal>
			<SafeAreaView>
				<Stack p={2} height={"full"} justifyContent="space-between">
					<FlatList
						data={grocerylist?.items?.sort((a: Item, b: Item) => {
							if (a.createdAt < b.createdAt) {
								return 1;
							} else if (a.createdAt > b.createdAt) {
								return -1;
							} else {
								return 0;
							}
						})}
						refreshControl={
							<RefreshControl
								refreshing={false}
								onRefresh={() => {
									onRefetch();
								}}
							/>
						}
						ListEmptyComponent={() => {
							return (
								<Box
									borderBottomColor={"gray.200"}
									borderBottomWidth={1}
								>
									<Text
										color={"gray.500"}
										width="full"
										textAlign="center"
										py={4}
										fontSize={16}
									>
										No items found
									</Text>
								</Box>
							);
						}}
						renderItem={({ item }: any) => (
							<ListItem
								type="g"
								key={item.id}
								item={item}
								onPress={() => {
									if (item.check) {
										unCheckItemMutation.mutate(item.id);
									} else {
										checkItemMutation.mutate(item.id);
									}
								}}
							/>
						)}
					/>
					{!!grocerylist && (
						<Box py={2}>
							<Button
								height={16}
								rounded="full"
								bgColor={Colors.light.CTA}
								onPress={() => setShow(true)}
							>
								<Text
									color="white"
									fontWeight="semibold"
									fontSize={16}
								>
									Add Item
								</Text>
							</Button>
						</Box>
					)}
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default function MealplanDetail({ navigation }: { navigation: any }) {
	const [mounted, setMounted] = useState(false);
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: "My Grocerylist" },
		{ key: "second", title: "Household" },
	]);

	const {
		data: grocerylist,
		isRefetching,
		refetch: grocerylistRefetch,
	} = useNewestGrocerylist();
	const household = useCurrentUserHousold();

	useEffect(() => {
		AsyncStorage.getItem("lastDashboardTab").then((value) => {
			setIndex(value ? parseInt(value) : 0);
			setMounted(true);
		});
	}, []);

	useEffect(() => {
		AsyncStorage.setItem("lastDashboardTab", index.toString());
	}, [index]);

	const renderScene = SceneMap({
		first: () => (
			<GrocerylistTab
				navigation={navigation}
				type="grocerylist"
				household={household.data?.data ?? null}
				grocerylist={grocerylist?.data ?? null}
				onRefetch={() => grocerylistRefetch()}
			/>
		),
		second: () => (
			<HouseholdTab
				navigation={navigation}
				type="household"
				household={
					household.data?.data?.id ? household.data?.data : null
				}
				grocerylist={household.data?.data?.grocerylist ?? null}
				onRefetch={() => household.refetch()}
			/>
		),
	});

	const renderTabBar = (props: {
		navigationState: { routes: { title: string }[] };
	}) => {
		return (
			<Box flexDirection="row">
				{props.navigationState.routes.map(
					(
						route: {
							title: string;
						},
						i: number
					) => {
						const color =
							index === i
								? useColorModeValue("#000", "#e5e5e5")
								: useColorModeValue("#1f2937", "#a1a1aa");
						const borderColor =
							index === i
								? Colors.primary[500]
								: useColorModeValue("coolGray.200", "gray.400");
						return (
							<Box
								borderBottomWidth="3"
								borderColor={borderColor}
								flex={1}
								bgColor={"white"}
								alignItems="center"
								p="3"
							>
								<Pressable
									onPress={() => {
										console.log(i);
										setIndex(i);
									}}
								>
									<Animated.Text
										style={{
											color,
										}}
									>
										{route.title}
									</Animated.Text>
								</Pressable>
							</Box>
						);
					}
				)}
			</Box>
		);
	};

	if (!mounted) return null;

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={renderTabBar}
		/>
	);
}

const ListItem = ({
	item,
	onPress,
	type,
}: {
	item: Item;
	onPress: () => void;
	type: "h" | "g";
}) => {
	const [checked, setChecked] = useState(item.check);
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				px={4}
				py={2}
			>
				{type === "h" && (
					<Stack>
						<Text fontSize={18} strikeThrough={checked}>
							{item?.ingredient?.name}
						</Text>
						<Text fontSize={13} color="gray.400">
							Added by: {item.createdBy}
						</Text>
					</Stack>
				)}
				{type === "g" && (
					<Text fontSize={18} strikeThrough={checked}>
						{item?.ingredient?.name}
					</Text>
				)}
				<TouchableOpacity
					onPress={() => {
						setChecked((prev: boolean) => !prev);
						onPress();
					}}
				>
					<Box padding={1}>
						{checked ? (
							<AntDesign
								name="checkcircle"
								size={24}
								color={Colors.primary[500]}
							/>
						) : (
							<AntDesign
								name="checkcircleo"
								size={24}
								color="black"
							/>
						)}
					</Box>
				</TouchableOpacity>
			</Stack>
			<Divider my={1} />
		</>
	);
};
