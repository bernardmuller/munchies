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
};

export default headerOptions;
