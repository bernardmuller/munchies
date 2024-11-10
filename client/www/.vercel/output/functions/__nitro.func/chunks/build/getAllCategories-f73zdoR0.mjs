import a from 'axios';
import { z } from 'zod';

const y = { categories: ["categories"], createIngredient: ["create-ingredient"], ingredients: ["ingredients"], deleteIngredient: ["delete-ingredient"], currentUserHouseholdDetails: ["household"], latestGrocerylistByUserId: ["grocerylist", "user"], latestGrocerylistByHouseholdId: ["grocerylist", "household"], createItem: ["create-item"], checkItem: ["check-item"], createList: ["create-list"], getGrocerylistById: (e) => ["grocerylist", e], currentUser: ["current-logged-in-user"] }, i = { getAllCategories: () => "http://localhost:8001/categories", ingredients: () => "http://localhost:8001/ingredients", deleteIngredient: (e) => `http://localhost:8001/ingredients/${e}`, getCurrentUserHouseholdDetails: () => "http://localhost:8001/households/current", households: () => "http://localhost:8001/households", joinHousehold: () => "http://localhost:8001/households/join", leaveHousehold: () => "http://localhost:8001/households/leave", latestGrocerylistByUserId: () => "http://localhost:8001/grocerylists/user", latestGrocerylistByHouseholdId: () => "http://localhost:8001/grocerylists/household", createGrocerylistItem: (e) => `http://localhost:8001/grocerylists/${e}/add`, checkItem: (e) => `http://localhost:8001/items/${e}/check`, createList: () => "http://localhost:8001/grocerylists", getGrocerylistById: (e) => `http://localhost:8001/grocerylists/${e}`, deleteItem: (e) => `http://localhost:8001/items/${e}`, getCurrentLoggedInUser: () => "http://localhost:8001/users/current" }, h = ({ accessToken: e }) => ({ Authorization: `Bearer ${e}`, "Access-Control-Allow-Origin": "*", "Content-Type": "application/json", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", "Cache-Control": "no-cache" }), c = a.create();
c.interceptors.response.use(async (e) => e, async (e) => Promise.reject(e));
const u = async (e, l = "GET", n, s) => {
  var _a, _b;
  try {
    const t = h({ accessToken: s == null ? void 0 : s.accessToken }), o = await c({ method: l, url: e, headers: { ...s == null ? void 0 : s.headers, ...t }, data: n });
    return { ok: true, status: o.status, data: o.data };
  } catch (t) {
    return { ok: false, status: (_b = (_a = t.response) == null ? void 0 : _a.status) != null ? _b : 500, error: t, message: t.message };
  }
}, p = 864e5;
z.object({ name: z.string(), id: z.string() });
async function $(e) {
  return await u(i.getAllCategories(), "GET", void 0, { accessToken: e });
}

export { $, i, p, u, y };
//# sourceMappingURL=getAllCategories-f73zdoR0.mjs.map
