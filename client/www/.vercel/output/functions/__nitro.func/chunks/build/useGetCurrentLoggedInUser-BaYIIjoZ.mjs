import { useQueryClient, useQuery } from '@tanstack/react-query';
import { y, p } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { a } from './getCurrentLoggedInUser-BSklaDhP.mjs';

function d() {
  const { getToken: a$1 } = useAuth(), r = a$1({ template: "1_HOUR" }).then((e) => e == null ? void 0 : e.toString()), n = useQueryClient();
  return { ...useQuery({ queryKey: y.currentUser, queryFn: async () => {
    const e = await a(await r);
    return e.data ? e.data : null;
  }, enabled: !!r, staleTime: p }), prefetch: async () => {
    if (r) return await n.cancelQueries(y.currentUser), await n.prefetchQuery({ queryKey: y.currentUser, queryFn: async () => {
      const e = await a(await r);
      return e.data ? e.data : null;
    } });
  } };
}

export { d };
//# sourceMappingURL=useGetCurrentLoggedInUser-BaYIIjoZ.mjs.map
