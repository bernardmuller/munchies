import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[0, 1], // Input range from fully collapsed to fully expanded
			[0, 1], // Output range for opacity
			Extrapolate.CLAMP // Ensures opacity stays within the 0 to 1 range
		),
	}));

	// styles
	const containerStyle = [
		style,
		{
			backgroundColor: "rgba(0,0,0,0.5)",
		},
		[style, containerAnimatedStyle],
	];

	return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
