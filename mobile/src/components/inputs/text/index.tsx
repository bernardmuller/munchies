import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "native-base";

const TextInput = ({
	name,
	placeholder,
	onChange,
	label,
	value,
	secure,
	control,
	onBlur,
	required,
}: {
	name: string;
	label: string;
	placeholder: string;
	secure?: boolean;
	control: any;
	onBlur?: () => void;
	required?: boolean;
}) => {
	return (
		<Controller
			control={control}
			rules={{
				required: required ? true : false,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<Input
					name={name}
					label={label}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					placeholder={placeholder}
					height={16}
					fontSize="md"
					borderRadius={10}
					secureTextEntry={secure}
				/>
			)}
			name={name}
		/>
	);
};

export default TextInput;
