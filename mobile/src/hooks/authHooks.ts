import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
export const useLogin = ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	return useMutation(login);
};
