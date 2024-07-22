import { atom, selector } from "recoil";

export const newIngredientSheetState = atom({
	key: "showNewIngredientSheet",
	default: false,
});
