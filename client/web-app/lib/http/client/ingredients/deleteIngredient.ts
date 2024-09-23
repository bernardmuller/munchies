import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";

export async function deleteIngredient({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  return await httpRequest<void, void>(
    apiRoutes.deleteIngredient(id),
    "DELETE",
    undefined,
    {
      accessToken: accessToken,
    },
  );
}
