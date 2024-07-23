import { atom } from "recoil";

// type theme = "light" | "dark";

export const themeState = atom({
	key: "theme",
	default: "light",
});
