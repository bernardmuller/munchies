import { ChevronRightIcon, Stack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useThemeProvider";

export type ListItemProps = {
	onPress: () => void;
	label: string;
	key?: string;
};

export default function ListItem({ onPress, label, key }: ListItemProps) {
	const { theme } = useTheme();
	return (
		<TouchableOpacity onPress={onPress}>
			<Stack
				direction="row"
				key={key}
				borderRadius={10}
				p={4}
				shadow="2"
				justifyContent={"space-between"}
				alignItems={"center"}
				backgroundColor={theme.colors.background_light}
				mb={2}
			>
				<Text fontSize={14}>{label}</Text>
				<ChevronRightIcon color={theme.colors.text.default} size={4} />
			</Stack>
		</TouchableOpacity>
	);
}
