import httpClient from "@/api/httpClient";
import jwt_decode from "jwt-decode";

type DecodedToken = {
	[key: string]: string;
};

const createSession = ({ token }: { token: string }) => {
	return new Promise((resolve, reject) => {
		const decodedToken = jwt_decode(token) as DecodedToken;
		const session = {
			username: decodedToken.username,
			expiresAt: decodedToken.expiresAt,
			userId: decodedToken.userId,
			token: token,
		};

		if (session.userId) {
			console.log({ session });
			localStorage.setItem("session", JSON.stringify(session));
		}
		httpClient.defaults.headers.Authorization = `Bearer ${token}`;
		resolve("Session created");
	});
};

export default createSession;
