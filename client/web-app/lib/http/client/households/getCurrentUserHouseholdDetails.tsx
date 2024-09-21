import apiRoutes from "../../routes";
import { httpRequest } from "../../httpRequest";
import { z } from "zod";

const MemberSchema = z.object({
  id: z.string().uuid(),
  firstname: z.string(),
  lastname: z.string(),
  household_id: z.string().uuid(),
});

const IngredientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category_id: z.string().uuid(),
  createdat: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  createdby: z.string().uuid().nullable(),
  deleted: z.boolean(),
});

const GroceryItemSchema = z.object({
  id: z.string().uuid(),
  type: z.number(),
  check: z.boolean(),
  ingredient: IngredientSchema,
  createdby: z.string().uuid().nullable(),
});

const GroceryListSchema = z.object({
  id: z.string().uuid(),
  createdat: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  items: z.array(GroceryItemSchema),
});

const HouseholdSchema = z.object({
  id: z.string().uuid(),
  createdBy: z.string().uuid(),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  active: z.boolean(),
  members: z.array(MemberSchema),
  grocerylist: GroceryListSchema,
});

export type Household = z.infer<typeof HouseholdSchema>;

export async function getCurrentUserHouseholdDetails(token: string) {
  return await httpRequest<any, void>(
    apiRoutes.getCurrentUserHouseholdDetails(),
    "GET",
    undefined,
    {
      accessToken: token,
    },
  );
}
