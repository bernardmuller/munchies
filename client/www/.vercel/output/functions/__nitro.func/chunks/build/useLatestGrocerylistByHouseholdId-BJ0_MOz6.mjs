import { useQuery } from '@tanstack/react-query';
import { y, p as p$1 } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { n, c } from './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';

function p({ initialData: t }) {
  const { getToken: s } = useAuth(), r = s({ template: "1_HOUR" }).then((e) => e == null ? void 0 : e.toString());
  return useQuery({ queryKey: y.latestGrocerylistByUserId, queryFn: async () => {
    const e = await n(await r);
    return e.data ? e.data : t;
  }, initialData: t, enabled: !!r, staleTime: p$1 });
}
function f({ initialData: t }) {
  const { getToken: s } = useAuth(), r = s({ template: "1_HOUR" }).then((e) => e == null ? void 0 : e.toString());
  return useQuery({ queryKey: y.latestGrocerylistByHouseholdId, queryFn: async () => {
    const e = await c(await r);
    return e.data ? e.data : t;
  }, initialData: t, enabled: !!r, staleTime: p$1 });
}

export { f, p };
//# sourceMappingURL=useLatestGrocerylistByHouseholdId-BJ0_MOz6.mjs.map
