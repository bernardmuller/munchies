import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

export async function checkOrUncheckItem({
  itemId,
  accessToken,
}: {
  itemId: string;
  accessToken: string;
}) {
  return await httpRequest<void, void>(
    apiRoutes.checkItem(itemId),
    "POST",
    undefined,
    {
      accessToken: accessToken,
    },
  );
}
