import {
	InvalidateQueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import createHousehold from "src/lib/http/endpoints/createHousehold";
import { getCurrentUserHousehold } from "src/lib/http/endpoints/getCurrentUserHoushold";
import joinHousehold from "src/lib/http/endpoints/joinHousehold";
import leaveHousehold from "src/lib/http/endpoints/leaveHousehold";

export const useCurrentUserHousold = () => {
	return useQuery({
		queryKey: ["current-user-household"],
		queryFn: () => getCurrentUserHousehold(),
	});
};

export const useLeaveHousehold = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["leave-household"],
		mutationFn: ({ id }: { id: string }) => leaveHousehold(id),
		onSettled: () => {
			queryClient.invalidateQueries([
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};

export const useCreateHousehold = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["create-household"],
		mutationFn: createHousehold,
		onSettled: () => {
			queryClient.invalidateQueries([
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};

export const useJoinHousehold = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["join-household"],
		mutationFn: ({ id }: { id: string }) => joinHousehold(id),
		onSettled: () => {
			queryClient.invalidateQueries([
				"current-user-household",
			] as InvalidateQueryFilters);
		},
	});
};
