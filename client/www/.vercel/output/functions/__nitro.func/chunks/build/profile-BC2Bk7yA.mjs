import { jsx, jsxs } from 'react/jsx-runtime';
import { d as d$1 } from './useGetCurrentLoggedInUser-BaYIIjoZ.mjs';
import { _ } from './useAppData-BtM9UegS.mjs';
import '@tanstack/react-query';
import './getAllCategories-f73zdoR0.mjs';
import 'axios';
import 'zod';
import '@clerk/tanstack-start';
import './getCurrentLoggedInUser-BSklaDhP.mjs';
import './getAllIngredients-6sXcg4a7.mjs';
import './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';
import 'react';

function d() {
  const r = d$1();
  if (!r.data && r.isFetching) return jsx("div", { children: "Loading..." });
  const { firstName: i, lastName: s, email: n, image: l, numberOfLists: a, numberOfItems: c } = r.data;
  return jsxs("div", { className: "min-h-[50vh] text-center ", children: [jsx("h2", { className: "text-2xl font-bold text-center mb-1", children: "My Profile" }), jsxs("div", { className: "space-y-4 p-4 w-full flex flex-col items-center", children: [jsx("div", { className: "relative", children: jsx("img", { src: l, alt: "profile-pic", className: "w-24 h-24 rounded-full object-cover bg-slate-100" }) }), jsx("div", { className: "flex items-center justify-between", children: jsxs("div", { className: "", children: [jsxs("h1", { className: "text-2xl font-bold", children: [i, " ", s] }), jsx("p", { className: "text-sm text-muted-foreground", children: n })] }) }), jsxs("div", { className: "flex space-x-4", children: [jsxs("span", { children: [jsx("strong", { children: a != null ? a : 0 }), " lists"] }), jsxs("span", { children: [jsx("strong", { children: c != null ? c : 0 }), " items"] })] }), jsx("div", { className: "space-y-2" })] })] });
}
const w = () => {
  const { isLoading: r } = _();
  return r ? jsx("div", { children: "Loading..." }) : jsx(d, {});
};

export { w as component };
//# sourceMappingURL=profile-BC2Bk7yA.mjs.map
