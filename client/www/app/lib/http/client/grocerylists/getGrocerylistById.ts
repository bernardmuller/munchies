import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { GroceryList } from "@/app/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

export async function getGrocerylistById(token: string, id: string) {
  return await httpRequest<GroceryList, void>(
    apiRoutes.getGrocerylistById(id),
    "GET",
    undefined,
    {
      accessToken: token,
    },
  );
}
