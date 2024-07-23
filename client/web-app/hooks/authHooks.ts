import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/api/endpoints/auth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
	const router = useRouter();
	return useMutation(login, {
		onSuccess: () => {
			router.push("/home");
		},
	});
};

export const useSignup = () => {
	return useMutation(signup);
};
