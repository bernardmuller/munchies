import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

export async function deleteItem({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  return await httpRequest<void, void>(
    apiRoutes.deleteItem(id),
    "DELETE",
    undefined,
    {
      accessToken: accessToken,
    },
  );
}
