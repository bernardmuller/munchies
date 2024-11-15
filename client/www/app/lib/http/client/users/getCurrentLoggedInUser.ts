import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";

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
