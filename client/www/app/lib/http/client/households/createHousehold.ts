import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const createHouseholdSchema = z.object({
  id: z.string(),
  createdBy: z.string(),
  createdAt: z.string(),
  active: z.boolean(),
});

export type CreateHousehold = z.infer<typeof createHouseholdSchema>;

export async function createHousehold({
  accessToken,
}: {
  accessToken: string;
}) {
  return await httpRequest<void, CreateHousehold>(
    apiRoutes.households(),
    "POST",
    undefined,
    {
      accessToken: accessToken,
    },
  );
}
