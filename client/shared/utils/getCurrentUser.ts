const getCurrentUser = () => {
	if (typeof window !== "undefined") {
		const currentSessionData = localStorage.getItem("session");
		return currentSessionData
			? JSON.parse(currentSessionData)?.username
			: "";
	}
};

export default getCurrentUser;
