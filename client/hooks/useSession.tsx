"use client";

import getCurrentSession from "@/shared/utils/getCurrentSession";
import clearSession from "@/shared/utils/clearSession";
import sessionExpiresInSeconds from "@/shared/utils/sessionExpiresInSeconds";
import sessionExpiryDate from "@/shared/utils/getSessionExpiryDate";
import getCurrentUser from "@/shared/utils/getCurrentUser";
import getIdToken from "@/shared/utils/getIdToken";
import sessionIsValid from "@/shared/utils/sessionIsValid";
import createSession from "@/shared/utils/createSession";

export const useSession = () => {
	return {
		getCurrentSession,
		createSession,
		clearSession,
		sessionExpiresInSeconds,
		sessionExpiryDate,
		getCurrentUser,
		getIdToken,
		sessionIsValid,
	};
};
