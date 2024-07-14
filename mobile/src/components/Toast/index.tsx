import { HStack, Text, VStack } from "native-base";
import { Alert } from "native-base";

function Toast({ title }: any) {
	return (
		<Alert
			maxWidth="100%"
			alignSelf="center"
			flexDirection="row"
			status="info"
			variant="info"
		>
			<VStack space={1} flexShrink={1} w="100%">
				<HStack
					flexShrink={1}
					alignItems="center"
					justifyContent="space-between"
				>
					<HStack space={2} flexShrink={1} alignItems="center">
						<Alert.Icon />
						<Text
							fontSize="md"
							fontWeight="medium"
							flexShrink={1}
							color="white"
						>
							{title}
						</Text>
					</HStack>
				</HStack>
			</VStack>
		</Alert>
	);
}

export default Toast;
