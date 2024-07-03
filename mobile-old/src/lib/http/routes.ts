import { requireBaseURL } from "src/shared/utils";

export const routes = {
	grocerylists: () => {
		const base_url = requireBaseURL();
		return `${base_url}/grocerylists`;
	},
	getGrocerylistById: (id: string) => {
		const base_url = requireBaseURL();
		return `${base_url}/grocerylists/${id}`;
	},
	getNewestGrocerylist: () => {
		const base_url = requireBaseURL();
		return `${base_url}/newest-grocerylist`;
	},
};
