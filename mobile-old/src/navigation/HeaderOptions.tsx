import { Avatar, View } from "native-base";
import { TouchableOpacity } from "react-native";
import Header from "../components/headers/Header";
import { useNavigation, useRoute } from "@react-navigation/native";

const headerOptions = {
	headerStyle: {},
	headerTitle: () => {
		const route = useRoute();
		return <Header name={route.name} />;
	},
	headerRight: () => {
		const navigation = useNavigation();
		return (
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("Settings")}
				>
					<Avatar
						size="sm"
						source={{
							uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	},
};

export default headerOptions;
