"use client";

import getCurrentSession from "@/shared/utils/getCurrentSession";
import clearSession from "@/shared/utils/clearSession";
import getCurrentUser from "@/shared/utils/getCurrentUser";
import createSession from "@/shared/utils/createSession";

export const useSession = () => {
	return {
		getCurrentSession,
		createSession,
		clearSession,
		getCurrentUser,
	};
};
