import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api//endpoints/auth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
	const router = useRouter();
	return useMutation(login, {
		onSuccess: () => {
			router.push("/home");
		},
	});
};
