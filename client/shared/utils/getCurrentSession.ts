const getCurrentSession = (): Session => {
	if (typeof window === "undefined") return {};
	return JSON.parse(localStorage.getItem("session") || "{}");
};

export default getCurrentSession;
