import { AntDesign } from "@expo/vector-icons";
import { Box, HStack, IconButton, StatusBar, Text } from "native-base";
import { useTheme } from "@/hooks/useThemeProvider";

type Props = {
	children: React.ReactNode;
};

export default function AppBar({ children }: Props) {
	const { theme } = useTheme();
	return (
		<>
			<StatusBar
				backgroundColor={theme.colors.background}
				barStyle="light-content"
			/>
			<Box safeAreaTop bg={theme.colors.background} />
			<HStack
				bg={theme.colors.background}
				px="4"
				justifyContent="space-between"
				alignItems="center"
				w="100%"
				minH={12}
			>
				{children}
			</HStack>
		</>
	);
}
