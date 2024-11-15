import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
// import { z } from 'zod';
<<<<<<< HEAD
// import {GroceryList} from "@/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
=======
// import {GroceryList} from "@/app/lib/http/client/grocerylists/getLatestGrocerylistByUserId";
>>>>>>> a53984d (feat: add http endpoint consumer hooks)

export type User = {
    id: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
    image: string;
    status: string;
    householdId: string;
    numberOfLists: number;
    numberOfItems: number;
}

export async function getCurrentLoggedInUser(token: string) {
  return await httpRequest<User, void>(
    apiRoutes.getCurrentLoggedInUser(),
    "GET",
    undefined,
    {
      accessToken: token,
    },
  );
}
