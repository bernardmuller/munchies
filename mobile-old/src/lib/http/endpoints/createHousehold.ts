import { httpRequest } from "../httpClient";
import { routes } from "../routes";

export default function createHousehold() {
	return httpRequest(routes.createHousehold(), "POST");
}
