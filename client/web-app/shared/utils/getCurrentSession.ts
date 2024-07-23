import { Session } from "@/types";

const getCurrentSession = (): Session => {
	const blankSession: Session = {
		username: "",
		token: "",
		userId: "",
		expiresAt: "",
	};
	if (typeof window === "undefined") return blankSession;
	const session = localStorage.getItem("session");
	if (!session) return blankSession;
	try {
		return JSON.parse(session);
	} catch (error) {
		console.log(error);
		return blankSession;
	}
};

export default getCurrentSession;
