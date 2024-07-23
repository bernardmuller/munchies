import { requireBaseURL } from "@/shared/utils";

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
	getAllIngredients: () => {
		const base_url = requireBaseURL();
		return `${base_url}/ingredients`;
	},
	getHouseholdById: (id: string) => {
		const base_url = requireBaseURL();
		return `${base_url}/households/${id}`;
	},
	getCurrentUserHousehold: () => {
		const base_url = requireBaseURL();
		return `${base_url}/current-user-household`;
	},
	leaveHousehold: (id: string) => {
		const base_url = requireBaseURL();
		return `${base_url}/households/${id}/leave`;
	},
	joinHousehold: (id: string) => {
		const base_url = requireBaseURL();
		return `${base_url}/households/${id}/join`;
	},
	createHousehold: () => {
		const base_url = requireBaseURL();
		return `${base_url}/households`;
	},
};
