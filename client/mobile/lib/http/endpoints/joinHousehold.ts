import { httpRequest } from "../httpClient";
import { routes } from "../routes";

export default function joinHousehold(id: string) {
	return httpRequest(routes.joinHousehold(id), "PUT");
}
