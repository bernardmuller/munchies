import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
export const useLogin = () => {
	return useMutation({
		mutationFn: login,
	});
};
