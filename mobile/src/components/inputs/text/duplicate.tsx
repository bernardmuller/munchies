import React from "react";
import { Controller, useForm } from "react-hook-form";
import { IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";

const Input = ({
	name,
	placeholder,
	secure = false,
	control,
	onBlur,
	required,
	onChange,
}: {
	name: string;
	label: string;
	placeholder?: string;
	secure?: boolean;
	control: any;
	onBlur?: () => void;
	required?: boolean;
	onChange?: () => void;
}) => {
	const [show, setShow] = React.useState(!secure);
	return (
		<Controller
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					// type="text"
					// w="100%"
					// h={60}
					// fontSize="md"
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					secureTextEntry={!show}
					// borderRadius={10}
					// InputRightElement={
					// 	secure ? (
					// 		<IconButton
					// 			height="100%"
					// 			width={60}
					// 			icon={
					// 				<Feather
					// 					name={!show ? "eye" : "eye-off"}
					// 					size={24}
					// 				/>
					// 			}
					// 			onPress={() => setShow((prev) => !prev)}
					// 		/>
					// 	) : (
					// 		<></>
					// 	)
					// }
				/>
			)}
			name={name}
		/>
	);
};

export default Input;
