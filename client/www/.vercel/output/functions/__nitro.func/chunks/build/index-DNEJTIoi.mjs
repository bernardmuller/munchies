import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import * as w from '@radix-ui/react-tabs';
import { m } from './utils-bhneXptQ.mjs';
import * as _ from '@radix-ui/react-checkbox';
import { Check, Filter, FilterXIcon, Pencil, Loader2, ClipboardList, Calendar, User, House } from 'lucide-react';
import { m as m$1, f as f$1, x, n } from './card-C2TxHGvX.mjs';
import { g } from './button-DZIqpug3.mjs';
import { b, D as D$1, h as h$1, m as m$2, p as p$1, g as g$1, u, v } from './input-DPMfAGGT.mjs';
import { p, f } from './useLatestGrocerylistByHouseholdId-BJ0_MOz6.mjs';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { y, u as u$1, i } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { z } from 'zod';
import { R, h } from './useCategories-BU-wEToM.mjs';
import { d } from './useGetCurrentLoggedInUser-BaYIIjoZ.mjs';
import { I, C, b as b$1, w as w$1 } from './dropdown-menu-CXlQBPJa.mjs';
import { a } from './skeleton-B3DVyw4A.mjs';
import { useNavigate } from '@tanstack/react-router';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-scroll-area';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-dialog';
import './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';
import 'axios';
import './getCurrentLoggedInUser-BSklaDhP.mjs';
import '@radix-ui/react-dropdown-menu';

const we = w.Root, E = React.forwardRef(({ className: t, ...i }, r) => jsx(w.List, { ref: r, className: m("md:max-w-[560px] inline-flex items-center justify-center md:gap-2 rounded-t-xl md:rounded-lg bg-background md:bg-white p-3 md:p-0 text-muted-foreground", t), ...i }));
E.displayName = w.List.displayName;
const D = React.forwardRef(({ className: t, ...i }, r) => jsx(w.Trigger, { ref: r, className: m("md:max-w-[280px] bg-white inline-flex items-center justify-center whitespace-nowrap rounded-lg md:rounded-md px-3 py-3 text-xs md:text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm md:data-[state=active]:shadow-none md:data-[state=active]:border-[1px] md:data-[state=active]:border-solid md:data-[state=active]:border-divider ", t), ...i }));
D.displayName = w.Trigger.displayName;
const G = React.forwardRef(({ className: t, ...i }, r) => jsx(w.Content, { ref: r, className: m("mt-0 md:mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", t), ...i }));
G.displayName = w.Content.displayName;
const Q = React.forwardRef(({ className: t, ...i }, r) => jsx(_.Root, { ref: r, className: m("peer h-6 w-6 shrink-0 rounded-sm border border-grey ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", t), ...i, children: jsx(_.Indicator, { className: m("flex items-center justify-center text-current"), children: jsx(Check, { className: "h-6 w-6" }) }) }));
Q.displayName = _.Root.displayName;
async function P({ itemId: t, accessToken: i$1 }) {
  return await u$1(i.checkItem(t), "POST", void 0, { accessToken: i$1 });
}
function be() {
  const t = useQueryClient(), { getToken: i } = useAuth();
  return useMutation({ mutationKey: y.checkItem, mutationFn: async (r) => {
    const n = await i({ template: "1_HOUR" }).then((l) => l == null ? void 0 : l.toString());
    return P({ itemId: r, accessToken: n });
  }, onMutate: async (r) => {
    await t.cancelQueries(y.latestGrocerylistByUserId);
    const n = t.getQueryData(y.latestGrocerylistByUserId);
    return n && n.items && t.setQueryData(y.latestGrocerylistByUserId, { ...n, items: n.items.map((l) => l.item_id === r ? { ...l, check: !l.check } : l) }), { prev: n };
  }, onSuccess: () => {
    t.invalidateQueries([...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId]);
  } });
}
function xe() {
  const t = useQueryClient(), { getToken: i } = useAuth();
  return useMutation({ mutationKey: y.checkItem, mutationFn: async (r) => {
    const n = await i({ template: "1_HOUR" }).then((l) => l == null ? void 0 : l.toString());
    return P({ itemId: r, accessToken: n });
  }, onMutate: async (r) => {
    await t.cancelQueries(y.latestGrocerylistByHouseholdId);
    const n = t.getQueryData(y.latestGrocerylistByHouseholdId);
    return n && n.items && t.setQueryData(y.latestGrocerylistByHouseholdId, { ...n, items: n.items.map((l) => l.item_id === r ? { ...l, check: !l.check } : l) }), { prev: n };
  }, onSuccess: () => {
    t.invalidateQueries([...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId]);
  } });
}
z.object({ household: z.boolean(), menu: z.boolean() });
async function ke({ data: t, accessToken: i$1 }) {
  return await u$1(i.createList(), "POST", t, { accessToken: i$1 });
}
function Ce() {
  const t = useQueryClient(), { getToken: i } = useAuth();
  return useMutation({ mutationKey: y.createList, mutationFn: async (r) => {
    const n = await i({ template: "1_HOUR" }).then((l) => l == null ? void 0 : l.toString());
    return ke({ data: r, accessToken: n });
  }, onSuccess: () => {
    t.invalidateQueries([...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId]);
  } });
}
function B({ id: t, items: i, onCheckOrUncheckItem: r, categories: n$1, isLoading: l }) {
  var _a;
  const [g$1, y] = useState(""), [N, x$1] = useState(i), [f, v] = useState(null), o = useNavigate(), c = useMemo(() => {
    const a = N == null ? void 0 : N.reduce((h, u) => (h[u.name] = (h[u.name] || 0) + 1, h), {});
    return N == null ? void 0 : N.reduce((h, u) => (h.some((S) => S.name === u.name) || h.push({ ...u, quantity: a[u.name] }), h), []);
  }, [N, i]);
  return useEffect(() => {
    i && Array.isArray(i) && x$1(i);
  }, [i]), jsx("div", { className: "bg-slate-100 md:bg-white", children: jsxs(n, { className: "bg-background md:bg-white px-3 py-3 rounded-b-sm h-fit md:rounded-lg", children: [(c == null ? void 0 : c.length) ? jsx("div", { className: "bg-white rounded-lg border-slate-200 border-[1px] p-3 mb-3", children: jsxs("div", { className: "flex justify-between", children: [jsx("div", { children: jsx(b, { placeholder: "Search items...", value: g$1, onChange: (a) => y(a.target.value) }) }), jsxs("div", { className: "flex items-center gap-2", children: [jsxs("div", { className: `flex items-center pl-2 rounded-md gap-1 ${f ? "border-[1px] border-slate-200" : ""}`, children: [(_a = n$1.find((a) => a.id === f)) == null ? void 0 : _a.name, jsxs(I, { children: [jsx(C, { children: jsx("div", { children: jsx(Filter, {}) }) }), jsx(b$1, { className: "px-2", align: "end", children: n$1.map((a) => jsx(w$1, { className: "p-2", children: jsx("div", { className: "flex gap-1 hover:bg-gray-50 w-full", onClick: () => v(a.id), children: a.name }) }, a.id)) })] })] }), jsx(g, { onClick: () => {
    y(""), v(null);
  }, variant: "ghost", disabled: !f, children: jsx(FilterXIcon, {}) })] })] }) }) : null, jsxs("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: [!(c == null ? void 0 : c.length) && jsxs("div", { className: "flex flex-col gap-2 justify-center items-center bg-white rounded-lg p-3 md:p-4 md:rounded-xl col-span-2", children: [jsx("span", { className: "text-center text-muted-foreground", children: "You have no items in your current list." }), jsx(g, { onClick: () => {
    t && o({ to: `/lists/${t}` });
  }, className: "mt-2", variant: "outline", children: "Add items" })] }), c && c.filter((a) => f !== null ? a.category_id === f : true).filter((a) => a.name.toLowerCase().includes(g$1.toLowerCase())).map((a) => jsx(m$1, { children: jsxs(x, { className: "flex items-center justify-between p-4 gap-2", children: [jsx("div", { className: "flex items-center justify-center w-8 h-8", children: jsx(Q, { id: a.item_id, checked: a.check, onCheckedChange: () => r(a.item_id), className: "w-6 h-6 border-2 border-primary" }) }), jsx("label", { htmlFor: a.item_id, className: `flex-grow text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${a.check ? "line-through text-muted-foreground" : ""}`, children: a.name }), a.quantity > 1 && jsxs("span", { className: "text-md font-semibold text-muted-foreground", children: ["x", a.quantity] })] }) }, a.item_id)), l ? jsx(Fragment, { children: [...Array(3)].map((a$1, h) => jsx(m$1, { children: jsx(x, { className: "p-6 px-7", children: jsxs("div", { className: "flex justify-between items-center", children: [jsxs("div", { className: "flex items-center space-x-2", children: [jsx(a, { className: "h-6 w-6 rounded-sm" }), jsx(a, { className: "h-6 w-24" })] }), jsx(a, { className: "h-6 w-12" })] }) }) }, h)) }) : null] })] }) });
}
const $ = ({ children: t }) => jsx(m$1, { className: "w-full p-4 md:rounded-lg h-fit md:mt-3", children: jsx(x, { className: "w-full md:p-0 rounded-lg", children: t }) });
function Ie({ list: t }) {
  var _a, _b, _c, _d, _e, _f, _g;
  const i = useNavigate();
  return jsxs($, { children: [jsxs("div", { className: "w-full flex justify-between items-center", children: [jsx("h3", { className: "text-md md:text-lg font-semibold", children: "My Shopping List" }), (t == null ? void 0 : t.id) && jsxs(g, { variant: "outline", onClick: () => i({ to: `/lists/${t.id}` }), children: [jsx(Pencil, { className: "mr-2 h-4 w-4" }), "Edit"] })] }), ((_a = t.items) == null ? void 0 : _a.length) ? jsxs("p", { className: "text-sm", children: ["Total Items: ", (_c = (_b = t.items) == null ? void 0 : _b.length) != null ? _c : "0"] }) : null, ((_d = t.items) == null ? void 0 : _d.length) ? jsxs("p", { className: "text-sm", children: ["Checked Items: ", (_g = (_f = (_e = t.items) == null ? void 0 : _e.filter((r) => r.check)) == null ? void 0 : _f.length) != null ? _g : "0"] }) : null] });
}
function Le({ list: t }) {
  var _a, _b, _c, _d, _e, _f, _g;
  const i = useNavigate();
  return jsxs($, { children: [jsxs("div", { className: "w-full flex justify-between items-center", children: [jsx("h3", { className: "text-md md:text-lg font-semibold", children: "My Household Shopping List" }), (t == null ? void 0 : t.id) && jsxs(g, { variant: "outline", onClick: () => i({ to: `/lists/${t.id}` }), children: [jsx(Pencil, { className: "mr-2 h-4 w-4" }), "Edit"] })] }), ((_a = t.items) == null ? void 0 : _a.length) ? jsxs("p", { className: "text-sm", children: ["Total Items: ", (_c = (_b = t.items) == null ? void 0 : _b.length) != null ? _c : "0"] }) : null, ((_d = t.items) == null ? void 0 : _d.length) ? jsxs("p", { className: "text-sm", children: ["Checked Items: ", (_g = (_f = (_e = t.items) == null ? void 0 : _e.filter((r) => r.check)) == null ? void 0 : _f.length) != null ? _g : "0"] }) : null] });
}
function Te() {
  const t = useNavigate(), [i, r] = useState(false), [n, l] = useState("type"), [g$2, y] = useState(null), N = Ce(), { toast: x } = h(), { data: f } = d(), v$1 = async (a) => {
    if (!g$2) return;
    r(true);
    const h = { household: a === "household", menu: g$2 === "mealplan" }, u = await N.mutateAsync(h);
    if (!u.ok || !u.data) {
      x({ variant: "destructive", title: "Error", description: "Something went wrong creating the list." }), r(false);
      return;
    }
    const S = { shopping: { me: `/lists/${u.data.data}`, household: `/lists/${u.data.data}` }, mealplan: { me: "/lists/mealplan/new", household: "/list/mealplan/new?householdId=id" } };
    t({ to: `${S[g$2][a]}` });
  }, o = () => {
    l("type"), y(null);
  }, c = "flex-1 h-16 text-lg transition-all duration-200 ease-in-out hover:bg-primary/10 hover:border-primary hover:border-2 active:bg-primary/20 active:scale-95";
  return jsxs(D$1, { onOpenChange: (a) => !a && o(), children: [jsx(h$1, { asChild: true, children: jsxs(g, { className: `fixed bottom-6 right-6 md:static md:w-auto md:h-auto md:rounded-md
                     w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg md:shadow-none
                     hover:bg-primary/90 transition-all duration-200 ease-in-out
                     flex items-center justify-center z-50`, children: [jsx("span", { className: "text-3xl md:hidden", children: "+" }), jsx("span", { className: "hidden md:inline", children: "Create List" })] }) }), jsxs(m$2, { className: "sm:max-w-[425px] bg-white", children: [jsxs(p$1, { children: [jsx(g$1, { className: "text-center mb-4", children: "Create a New List" }), !i && jsx(u, { className: "text-center", children: n === "type" ? "Select the type of list you want to create." : "Choose who this list is for." })] }), i && jsxs("div", { className: "flex flex-col gap-2 justify-center items-center", children: [jsx(Loader2, { className: "h-6 w-6 animate-spin" }), jsx("span", { children: "Creating new list..." })] }), !i && jsxs(Fragment, { children: [n === "type" ? jsxs("div", { className: "flex flex-col gap-4", children: [jsxs(g, { onClick: () => {
    y("shopping"), l("scope");
  }, className: c, variant: "outline", children: [jsx(ClipboardList, { className: "mr-2 h-6 w-6" }), "Shopping List"] }), jsxs(g, { onClick: () => {
    y("mealplan"), l("scope");
  }, className: c, variant: "outline", disabled: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true", children: [jsx(Calendar, { className: "mr-2 h-6 w-6" }), "Mealplan List ", process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true" && "(Coming Soon)"] })] }) : jsxs("div", { className: "flex flex-col gap-4", children: [jsxs(g, { onClick: () => v$1("me"), className: c, variant: "outline", children: [jsx(User, { className: "mr-2 h-6 w-6" }), "For Me"] }), (f == null ? void 0 : f.householdId) && jsxs(g, { onClick: () => v$1("household"), className: c, variant: "outline", children: [jsx(House, { className: "mr-2 h-6 w-6" }), "For Household"] })] }), n === "scope" ? jsx(g, { onClick: () => l("type"), variant: "outline", className: "mt-4", children: "Back" }) : jsx(v, { className: "w-full mt-4", children: jsx(g, { variant: "outline", className: "w-full", children: "Cancel" }) })] })] })] });
}
function Se() {
  const { data: t, isFetching: i } = p({ initialData: null }), { data: r, isLoading: n } = f({ initialData: null }), { data: l } = R(), g = be(), y = xe(), N = (o) => {
    const c = t.items.find((a) => a.item_id === o);
    for (const a of t.items) a.item_id !== o && a.name === (c == null ? void 0 : c.name) && g.mutateAsync(a.item_id);
  }, x$1 = (o) => {
    const c = r.items.find((a) => a.item_id === o);
    for (const a of r.items) a.item_id !== o && a.name === (c == null ? void 0 : c.name) && g.mutateAsync(a.item_id);
  }, f$2 = (o) => {
    g.mutateAsync(o), N(o);
  }, v = (o) => {
    y.mutateAsync(o), x$1(o);
  };
  return i && !t ? jsxs("div", { className: "container mx-auto p-4 space-y-4", children: [jsxs("div", { className: "flex justify-between items-center", children: [jsxs("div", { className: "space-x-2", children: [jsx(a, { className: "h-10 w-32 inline-block" }), jsx(a, { className: "h-10 w-40 inline-block" })] }), jsx(a, { className: "h-10 w-24" })] }), jsx(m$1, { children: jsxs(f$1, { children: [jsx(a, { className: "h-6 w-40 mb-2" }), jsxs("div", { className: "space-y-2", children: [jsx(a, { className: "h-4 w-48" }), jsx(a, { className: "h-4 w-32" }), jsx(a, { className: "h-4 w-40" })] })] }) }), jsx(a, { className: "h-10 w-full" }), jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [...Array(5)].map((o, c) => jsx(m$1, { children: jsx(x, { className: "p-4", children: jsxs("div", { className: "flex justify-between items-center", children: [jsxs("div", { className: "flex items-center space-x-2", children: [jsx(a, { className: "h-4 w-4 rounded-sm" }), jsx(a, { className: "h-4 w-24" })] }), jsx(a, { className: "h-4 w-8" })] }) }) }, c)) })] }) : jsx("div", { className: "space-y-4", children: jsxs(we, { defaultValue: "my", className: "w-full", children: [jsxs("div", { className: "w-full flex justify-between md:px-3 md:mt-3", children: [jsxs(E, { className: "grid w-full md:w-1/2 grid-cols-2", children: [jsx(D, { value: "my", children: "My Shopping List" }), r && jsx(D, { value: "household", children: "Household Shopping List" })] }), jsx(Te, {})] }), jsxs("div", { className: "lg:pt-2", children: [jsx(G, { value: "my", children: jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-1 md:gap-4", children: [jsx("div", { className: "px-3", children: jsx(Ie, { list: t }) }), jsx(B, { id: t == null ? void 0 : t.id, items: t == null ? void 0 : t.items, onCheckOrUncheckItem: f$2, categories: l != null ? l : [], isLoading: i })] }) }), r && jsx(G, { value: "household", children: jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-1 md:gap-4", children: [jsx("div", { className: "px-3", children: jsx(Le, { list: r }) }), jsx(B, { id: r == null ? void 0 : r.id, items: r == null ? void 0 : r.items, onCheckOrUncheckItem: v, categories: l != null ? l : [], isLoading: n })] }) })] })] }) });
}
const st = () => jsx("div", { className: "w-full min-h-[50vh]", children: jsx(Se, {}) });

export { st as component };
//# sourceMappingURL=index-DNEJTIoi.mjs.map
