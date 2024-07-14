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
	Pressable,
	useColorModeValue,
	HStack,
	IconButton,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { useCheckItem, useCreateItem, useUnCheckItem } from "../../hooks/items";
import { AntDesign } from "@expo/vector-icons";
import {
	useCreateGrocerylist,
	useNewestGrocerylist,
} from "../../hooks/grocerylistHooks";
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
import { useTheme } from "src/hooks/useThemeProvider";
import AppBar from "src/components/app-bar/Appbar";
import { Ingredient } from "src/lib/http/endpoints/getAllIngredients";

type MyGrocerylistTabProps = {
	grocerylist: Grocerylist | null;
	household: Household | null;
	onRefetch: () => void;
	type: "grocerylist" | "household";
	navigation: any;
};

type AddItemListProps = {
	search: string;
	setSearch: (value: string) => void;
	createItemMutation: any;
	ingredients: Ingredient[];
	grocerylist: Grocerylist | null;
	bottomSheetModalRef: any;
};

function AddItemList({
	search,
	setSearch,
	createItemMutation,
	ingredients,
	grocerylist,
	bottomSheetModalRef,
}: AddItemListProps) {
	const { theme } = useTheme();
	return (
		<Box p={4}>
			<Input
				height={12}
				fontSize={14}
				onFocus={() => {
					bottomSheetModalRef.current?.snapToIndex(2);
				}}
				onBlur={() => {
					bottomSheetModalRef.current?.snapToIndex(1);
				}}
				rounded="full"
				pl={4}
				borderColor={theme.colors.text.muted}
				color={theme.colors.text.contrast}
				value={search}
				onChange={(e) => setSearch(e.nativeEvent.text)}
				placeholder="Search item..."
				mb={2}
			/>
			<FlatList
				data={ingredients?.filter((item) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				)}
				ListEmptyComponent={() => {
					return (
						<Box
							borderBottomColor={theme.colors.text.muted}
							borderBottomWidth={1}
						>
							<Text
								color={theme.colors.text.muted}
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
							textAlign="center"
							width="full"
							rounded={0}
							borderTopColor={theme.colors.text.muted}
							borderTopWidth={index === 0 ? 1 : 0}
							borderBottomColor={theme.colors.text.muted}
							borderBottomWidth={1}
							bgColor={"white"}
							_focus={{
								bg: theme.colors.text.muted,
							}}
							onPress={async () => {
								await createItemMutation.mutateAsync({
									name: item.name,
									check: false,
									ingredientId: item.id,
									grocerylistId: grocerylist?.id as string,
								});
							}}
						>
							<Text color={theme.colors.text.contrast}>
								{item.name}
							</Text>
						</Button>
					);
				}}
			/>
		</Box>
	);
}

const HouseholdTab = ({
	household,
	onRefetch,
	navigation,
}: MyGrocerylistTabProps) => {
	const { theme } = useTheme();
	const [show, setShow] = useState(false);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [search, setSearch] = useState("");

	const createItemMutation = useCreateItem(
		household?.grocerylist?.id as string
	);
	const ingredients = useIngredientsData();
	const checkItemMutation = useCheckItem("h");
	const unCheckItemMutation = useUnCheckItem("h");

	useEffect(() => {
		if (show) {
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [show]);

	if (!household) {
		return (
			<Stack
				p={4}
				space={4}
				h="full"
				backgroundColor={theme.colors.background_dark}
			>
				<Text textAlign="center" py={3} px={8} color="gray.400">
					You can create and share a grocerylist with your household
				</Text>
				<Button
					onPress={() => {
						navigation.navigate("HouseholdManagement");
					}}
				>
					Manage Household
				</Button>
			</Stack>
		);
	}

	if (!household.grocerylist)
		return (
			<Stack backgroundColor={theme.colors.background_dark}>
				<Text textAlign="center" py={3} color="gray.400">
					No Grocerylist found
				</Text>
			</Stack>
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
					<AddItemList
						search={search}
						setSearch={setSearch}
						createItemMutation={createItemMutation}
						ingredients={ingredients?.data?.data ?? []}
						grocerylist={household.grocerylist}
						bottomSheetModalRef={bottomSheetModalRef}
					/>
				</BottomSheetView>
			</BottomSheetModal>
			<SafeAreaView>
				<Stack
					p={2}
					height={"full"}
					justifyContent="space-between"
					bgColor={theme.colors.background_dark}
				>
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
						<Box py={1} px={4}>
							<Button onPress={() => setShow(true)}>
								<Text fontWeight="semibold" fontSize={16}>
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

	const { theme } = useTheme();

	const createItemMutation = useCreateItem(grocerylist?.id as string);
	const ingredients = useIngredientsData();
	const checkItemMutation = useCheckItem("g");
	const unCheckItemMutation = useUnCheckItem("g");

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
					<AddItemList
						search={search}
						setSearch={setSearch}
						createItemMutation={createItemMutation}
						ingredients={ingredients?.data?.data ?? []}
						grocerylist={grocerylist}
						bottomSheetModalRef={bottomSheetModalRef}
					/>
				</BottomSheetView>
			</BottomSheetModal>
			<SafeAreaView>
				<Stack
					p={2}
					height={"full"}
					justifyContent="space-between"
					backgroundColor={theme.colors.background_dark}
				>
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
									borderBottomColor={theme.colors.text.muted}
									borderBottomWidth={1}
								>
									<Text
										color={theme.colors.text.muted}
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
						<Box py={1} px={4}>
							<Button
								rounded="full"
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

export default function Dashboard({ navigation }: { navigation: any }) {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: "My Grocerylist" },
		{ key: "second", title: "Household" },
	]);

	const { data: grocerylist, refetch: grocerylistRefetch } =
		useNewestGrocerylist();
	const household = useCurrentUserHousold();
	const createGroceryList = useCreateGrocerylist();

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
		const { theme } = useTheme();
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
								? useColorModeValue(
										theme.colors.text.default,
										theme.colors.text.muted
								  )
								: useColorModeValue(
										theme.colors.text.muted,
										theme.colors.text.default
								  );
						const borderColor =
							index === i
								? Colors.primary[500]
								: useColorModeValue(
										theme.colors.secondary[700],
										theme.colors.text.muted
								  );
						return (
							<Box
								borderBottomWidth="3"
								borderTopWidth="0"
								borderColor={borderColor}
								flex={1}
								bgColor={theme.colors.background}
								alignItems="center"
								p="3"
							>
								<Pressable
									onPress={() => {
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
		<>
			<AppBar>
				<HStack
					w="full"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text fontSize={20} fontWeight="bold">
						Dashboard
					</Text>
					<IconButton
						icon={
							<AntDesign
								name="pluscircleo"
								size={28}
								color={theme.colors.white}
							/>
						}
						onPress={async () => {
							await AsyncStorage.getItem("lastDashboardTab")
								.then((value) => {
									return value;
								})
								.then((value) => {
									if (value === "1") {
										if (!household.data?.data?.id) return;
										createGroceryList.mutateAsync({
											householdId: household.data?.data
												?.id as string,
										});
									} else if (value === "0") {
										createGroceryList.mutateAsync({
											householdId: null,
										});
									}
								});
						}}
					/>
				</HStack>
			</AppBar>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={renderTabBar}
			/>
		</>
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
	const { theme } = useTheme();
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
						<Text fontSize={13} color="muted">
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
						<AntDesign
							name={checked ? "checkcircle" : "checkcircleo"}
							size={24}
							color={
								checked
									? theme.colors.primary[500]
									: theme.colors.text.muted
							}
						/>
					</Box>
				</TouchableOpacity>
			</Stack>
			<Divider my={1} />
		</>
	);
};
