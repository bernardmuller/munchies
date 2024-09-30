import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const createListSchema = z.object({
  household: z.boolean(),
  menu: z.boolean(),
});

export type CreateList = z.infer<typeof createListSchema>;

export async function createList({
  data,
  accessToken,
}: {
  data: CreateList;
  accessToken: string;
}) {
  return await httpRequest<{ data: string }, CreateList>(
    apiRoutes.createList(),
    "POST",
    data,
    {
      accessToken: accessToken,
    },
  );
}
