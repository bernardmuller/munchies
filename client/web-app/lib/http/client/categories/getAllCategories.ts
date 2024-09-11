import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export async function getAllCategories() {
  return await httpRequest<Category[], void>(
    apiRoutes.getAllCategories(),
    "GET",
    undefined,
    {
      accessToken: "",
    },
  );
}
