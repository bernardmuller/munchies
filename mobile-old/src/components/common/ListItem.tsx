import { ChevronRightIcon, Stack, Text } from "native-base";
import { TouchableOpacity } from "react-native";

export type ListItemProps = {
	onPress: () => void;
	label: string;
	key?: string;
};

export default function ListItem({ onPress, label, key }: ListItemProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Stack
				direction="row"
				key={key}
				height="16"
				bgColor="white"
				borderRadius={10}
				p={2}
				px={4}
				shadow="2"
				my={1}
				mx={2}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Text fontSize="xl">{label}</Text>
				<ChevronRightIcon />
			</Stack>
		</TouchableOpacity>
	);
}
