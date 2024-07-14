import { useState } from "react";

export const useNewIngredientSheet = () => {
	const [sheetVisible, setSheetVisible] = useState(false);

	return {
		sheetVisible,
		setSheetVisible,
	};
};
