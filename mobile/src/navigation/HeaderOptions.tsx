import Header from "../components/headers/Header";
import { useRoute } from "@react-navigation/native";
import Colors from "src/constants/Colors";

const headerOptions = {
	headerStyle: {
		backgroundColor: Colors.dark.background,
		// elevation: 0,
		// shadowOpacity: 0,
		// borderBottomWidth: 0,
		headerShadowVisible: false,
		borderBottomWidth: 0,
		// shadowColor: "transparent",
	},
	headerTitle: () => {
		const route = useRoute();
		return <Header name={route.name} />;
	},
};

export default headerOptions;
