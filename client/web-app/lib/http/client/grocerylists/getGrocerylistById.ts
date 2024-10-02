import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from 'zod';
import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";

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
