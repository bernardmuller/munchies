import { u, i } from './getAllCategories-f73zdoR0.mjs';
import { z } from 'zod';

const a = z.object({ item_id: z.string(), check: z.boolean(), name: z.string(), ingredient_id: z.string(), category_id: z.string() });
z.object({ id: z.string(), householdId: z.string().nullable(), mealplanID: z.string().nullable(), createdBy: z.string(), items: z.array(a), createdAt: z.string() });
async function n(e) {
  return await u(i.latestGrocerylistByUserId(), "GET", void 0, { accessToken: e });
}
async function c(e) {
  return await u(i.latestGrocerylistByHouseholdId(), "GET", void 0, { accessToken: e });
}

export { c, n };
//# sourceMappingURL=getLatestGrocerylistByHouseholdId-edhHmGoA.mjs.map
