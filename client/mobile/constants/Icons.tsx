import { Feather, Ionicons } from "@expo/vector-icons";

const ICON_SIZE = 24;

export type IconProps = {
	Type: "Feather" | "Ionicons";
	name: any;
	size?: number;
};

const Icon = ({ Type, name }: IconProps) => {
	return <Type name={name} size={ICON_SIZE} />;
};

const Icons = {
	nav: {
		grocerylists: () => (
			<Icon Type="Feather" name="shopping-bag" size={ICON_SIZE} />
		),
		mealplans: () => <Ionicons name="fast-food-outline" size={ICON_SIZE} />,
		recipes: () => <Feather name="book-open" size={ICON_SIZE} />,
		ingredients: () => <Feather name="shopping-cart" size={ICON_SIZE} />,
		settings: () => <Feather name="settings" size={ICON_SIZE} />,
	},
	home: <Feather name="home" size={ICON_SIZE} />,
	search: <Feather name="search" size={ICON_SIZE} />,
	profile: <Feather name="user" size={ICON_SIZE} />,
};

export default Icons;
