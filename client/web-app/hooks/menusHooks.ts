import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMenu, fetchCurrentMenu } from "@/api/endpoints/menus";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const useCreateMealplan = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { toast } = useToast();
	return useMutation(createMenu, {
		onSuccess: () => {
			queryClient.invalidateQueries(["currentMenu"]);
			queryClient.invalidateQueries(["menus"]);
			if (typeof window !== "undefined") {
				localStorage.setItem("confetti", "true");
			}

			toast({
				variant: "success",
				title: "Success",
				description: "Mealplan created successfully",
			});

			router.push("/home");
		},
	});
};

export const useCurrentMenuData = () => {
	return useQuery(["currentMenu"], () => fetchCurrentMenu());
};
