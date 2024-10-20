import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const joinHouseholdSchema = z.object({
  householdId: z.string(),
});

export type JoinHousehold = z.infer<typeof joinHouseholdSchema>;

export async function joinHousehold({
  householdId,
  accessToken,
}: {
  householdId: string;
  accessToken: string;
}) {
  return await httpRequest<void, JoinHousehold>(
    apiRoutes.joinHousehold(),
    "POST",
    { householdId },
    {
      accessToken: accessToken,
    },
  );
}
