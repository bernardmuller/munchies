import React, { useState, useEffect } from "react";

type DebouncedInputProps = {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
	placeholder: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const DebouncedInput: React.FC<DebouncedInputProps> = ({
	value: initialValue,
	onChange,
	debounce = 500,
	placeholder,
}) => {
	const [value, setValue] = useState<number | string>(initialValue);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	if (!placeholder)
		throw new Error("DebouncedInput: placeholder is required");

	return (
		<div className="relative">
			<div className="flex items-center border border-primary-gray rounded">
				<svg
					className="w-4 h-4 text-gray-300 mx-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				<input
					className="block w-full p-2 text-sm font-normal border-0 outline-none focus:ring-0"
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
				/>
				{value && (
					<button
						className="p-2 text-gray-300"
						onClick={() => setValue("")}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
};

export default DebouncedInput;
