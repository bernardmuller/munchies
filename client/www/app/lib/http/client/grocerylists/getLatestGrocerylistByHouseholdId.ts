import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

export async function getLatestGrocerylistByHouseholdId(token: string) {
  return await httpRequest<GroceryList, void>(
    apiRoutes.latestGrocerylistByHouseholdId(),
    "GET",
    undefined,
    {
      accessToken: token,
    },
  );
}
