import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api//endpoints/auth";

export const useLogin = () => {
	return useMutation(login);
};
