import { httpRequest } from "../httpClient";
import { routes } from "../routes";

export default function leaveHousehold(id: string) {
	return httpRequest(routes.leaveHousehold(id), "PUT");
}
