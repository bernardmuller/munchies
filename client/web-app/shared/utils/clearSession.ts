const clearSession = () => {
	localStorage.setItem(
		"session",
		JSON.stringify({
			userId: "",
		})
	);
};

export default clearSession;
