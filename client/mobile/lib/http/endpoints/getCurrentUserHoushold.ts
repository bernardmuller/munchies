import { routes } from "@/lib/http/routes";
import { httpRequest } from "@/lib/http/httpClient";
import { Household } from "./getHousholdById";

export async function getCurrentUserHousehold() {
	return await httpRequest<Household, null>(
		routes.getCurrentUserHousehold(),
		"GET"
	);
}
