import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";

export async function leaveHousehold({ accessToken }: { accessToken: string }) {
  return await httpRequest<void, void>(
    apiRoutes.leaveHousehold(),
    "POST",
    undefined,
    {
      accessToken: accessToken,
    },
  );
}
