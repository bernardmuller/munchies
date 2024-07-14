import { View, Text } from "native-base";

type HeaderProps = {
	name: string;
};

const Header = ({ name }: HeaderProps) => {
	return (
		<View>
			<Text>{name}</Text>
		</View>
	);
};

export default Header;
