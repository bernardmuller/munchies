import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMenu, fetchCurrentMenu } from "@/api/endpoints/menus";
import { useRouter } from "next/navigation";

export const useCreateMealplan = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation(createMenu, {
		onSuccess: () => {
			queryClient.invalidateQueries(["currentMenu"]);
			queryClient.invalidateQueries(["menus"]);
			router.push("/home");
		},
	});
};

export const useCurrentMenuData = () => {
	return useQuery(["currentMenu"], () => fetchCurrentMenu());
};
