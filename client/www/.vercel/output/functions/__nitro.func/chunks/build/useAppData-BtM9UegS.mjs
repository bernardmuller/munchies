import { useQueries } from '@tanstack/react-query';
import { useAuth } from '@clerk/tanstack-start';
import { y, p, $, u, i } from './getAllCategories-f73zdoR0.mjs';
import { a } from './getCurrentLoggedInUser-BSklaDhP.mjs';
import { a as a$1 } from './getAllIngredients-6sXcg4a7.mjs';
import { n, c } from './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';
import { z } from 'zod';
import { useState } from 'react';

const w = z.object({ id: z.string().uuid(), firstname: z.string(), lastname: z.string(), household_id: z.string().uuid() }), D = z.object({ id: z.string().uuid(), name: z.string(), category_id: z.string().uuid(), createdat: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid date" }), createdby: z.string().uuid().nullable(), deleted: z.boolean() }), L = z.object({ id: z.string().uuid(), type: z.number(), check: z.boolean(), ingredient: D, createdby: z.string().uuid().nullable() }), T = z.object({ id: z.string().uuid(), createdat: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid date" }), items: z.array(L) });
z.object({ id: z.string().uuid(), createdBy: z.string().uuid(), createdAt: z.string().refine((s) => !isNaN(Date.parse(s)), { message: "Invalid date" }), active: z.boolean(), members: z.array(w), grocerylist: T });
async function U(s) {
  return await u(i.getCurrentUserHouseholdDetails(), "GET", void 0, { accessToken: s });
}
function _() {
  const { getToken: s } = useAuth(), a$2 = s({ template: "1_HOUR" }).then((e) => e == null ? void 0 : e.toString()), [u, l] = useState({ userListId: null, householdListId: null }), r = useQueries({ queries: [{ queryKey: y.currentUser, queryFn: async () => {
    const e = await a(await a$2);
    return e.data ? e.data : null;
  }, enabled: !!a$2, staleTime: p }, { queryKey: y.latestGrocerylistByUserId, queryFn: async () => {
    const e = await n(await a$2);
    return e.data ? (l((c) => ({ ...c, householdListId: e.data ? e.data.id : null })), e.data) : null;
  }, enabled: !!a$2, staleTime: p }] }), o = useQueries({ queries: [{ queryKey: y.categories, queryFn: async () => {
    const e = await $(await a$2);
    return e.data ? e.data : null;
  }, enabled: !!a$2, staleTime: p }, { queryKey: y.ingredients, queryFn: async () => {
    const e = await a$1(await a$2);
    return e.data ? e.data : null;
  }, enabled: !!a$2, staleTime: p }, { queryKey: y.latestGrocerylistByHouseholdId, queryFn: async () => {
    const e = await c(await a$2);
    return e.data ? e.data : null;
  }, enabled: !!a$2 && !!u.householdListId, staleTime: p }, { queryKey: y.currentUserHouseholdDetails, queryFn: async () => {
    const e = await U(await a$2);
    return e.data ? e.data : null;
  }, enabled: !!a$2, staleTime: p }] });
  return { currentUser: r[0].data, categories: o[0].data, ingredients: o[2].data, myList: r[1].data, myHouseholdList: o[2].data, household: o[3].data, isLoading: r.some((e) => e.isLoading), isFetching: r.some((e) => e.isFetching), isError: r.some((e) => e.isError), isAbsent: r.some((e) => !e.data) };
}

export { U, _ };
//# sourceMappingURL=useAppData-BtM9UegS.mjs.map
