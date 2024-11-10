import { jsx, jsxs } from 'react/jsx-runtime';
import { Outlet, useRouterState, Link } from '@tanstack/react-router';
import { FaGithub } from 'react-icons/fa';
import * as React from 'react';
import { X, Loader2, Menu, User, House, ClipboardList, List, Calendar, Drumstick, Settings } from 'lucide-react';
import { g } from './button-DZIqpug3.mjs';
import { I, C, b, N, w } from './dropdown-menu-CXlQBPJa.mjs';
import * as l from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { m as m$1 } from './utils-bhneXptQ.mjs';
import { useAuth, SignOutButton } from '@clerk/tanstack-start';
import { CgProfile } from 'react-icons/cg';
import * as u from '@radix-ui/react-tooltip';
import { RxExit } from 'react-icons/rx';
import { y } from './getAllCategories-f73zdoR0.mjs';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { n } from './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';
import { a } from './getAllIngredients-6sXcg4a7.mjs';
import { d as d$1 } from './useGetCurrentLoggedInUser-BaYIIjoZ.mjs';
import { _ } from './useAppData-BtM9UegS.mjs';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import '@radix-ui/react-slot';
import '@radix-ui/react-dropdown-menu';
import 'clsx';
import 'tailwind-merge';
import 'axios';
import 'zod';
import './getCurrentLoggedInUser-BSklaDhP.mjs';

const ee = l.Root, te = l.Trigger, d = l.Close, ae = l.Portal, S = React.forwardRef(({ className: t, ...a }, s) => jsx(l.Overlay, { className: m$1("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", t), ...a, ref: s }));
S.displayName = l.Overlay.displayName;
const re = cva("fixed z-50 gap-4 dark bg-header p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", { variants: { side: { top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm" } }, defaultVariants: { side: "right" } }), M = React.forwardRef(({ side: t = "right", className: a, children: s, ...n }, i) => jsxs(ae, { children: [jsx(S, {}), jsxs(l.Content, { ref: i, className: m$1(re({ side: t }), a), ...n, children: [s, jsxs(l.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [jsx(X, { className: "h-4 w-4" }), jsx("span", { className: "sr-only", children: "Close" })] })] })] }));
M.displayName = l.Content.displayName;
const se = React.forwardRef(({ className: t, ...a }, s) => jsx(l.Title, { ref: s, className: m$1("text-lg font-semibold text-foreground", t), ...a }));
se.displayName = l.Title.displayName;
const ie = React.forwardRef(({ className: t, ...a }, s) => jsx(l.Description, { ref: s, className: m$1("text-sm text-muted-foreground", t), ...a }));
ie.displayName = l.Description.displayName;
const ne = u.Provider, le = u.Root, oe = u.Trigger, A = React.forwardRef(({ className: t, sideOffset: a = 4, ...s }, n) => jsx(u.Content, { ref: n, sideOffset: a, className: m$1("z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t), ...s }));
A.displayName = u.Content.displayName;
const x = [{ title: "My Profile", href: "/settings/profile" }, { title: "My Household", href: "/settings/household" }], v = [{ name: "Shopping Lists", href: "/lists", comingSoon: false, httpKey: y.latestGrocerylistByUserId, queryFn: async (t) => await n(await t).then((a) => a.data) }, { name: "Items", href: "/items", comingSoon: false, httpKey: y.ingredients, queryFn: async (t) => await a(await t).then((a) => a.data) }, { name: "Meal Plans", href: "/plans", comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true" }, { name: "Meals", href: "/meals", comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true" }];
function de({ currentUser: t }) {
  const s = useRouterState().location.pathname, { getToken: n } = useAuth();
  return t ? jsx("nav", { className: "w-full z-50 bg-header", children: jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxs("div", { className: "flex items-center justify-between h-16", children: [jsxs("div", { className: "flex items-center", children: [jsxs("div", { className: "flex-shrink-0 flex", children: [jsx("h1", { className: "text-white text-2xl font-extrabold", children: "M" }), jsx("h1", { className: "text-white text-2xl font-extrabold", children: "unchies" })] }), jsx("div", { className: "hidden md:block ml-10", children: jsx("div", { className: "flex items-baseline space-x-4", children: v.map((i) => jsx(me, { href: i.href, active: s === i.href, comingSoon: i.comingSoon, httpKey: i.httpKey, queryFn: async () => {
    const o = await n({ template: "1_HOUR" }).then((p) => p == null ? void 0 : p.toString());
    return !o || !i.queryFn || s === i.href ? null : i.queryFn(o);
  }, children: i.name }, i.name)) }) })] }), jsx("div", { className: "hidden md:block", children: jsx("div", { className: "ml-4 flex items-center md:ml-6", children: jsx(ce, { avatar: t.image, username: `${t.firstName} ${t.lastName}`, email: t.email }) }) }), jsx("div", { className: "flex items-center md:hidden", children: jsxs(ee, { children: [jsx(te, { asChild: true, children: jsxs(g, { variant: "ghost", size: "icon", className: "text-white ml-2 w-10 h-10", children: [jsx(Menu, { className: "min-h-6 min-w-6" }), jsx("span", { className: "sr-only", children: "Open main menu" })] }) }), jsx(M, { side: "right", className: "w-full sm:max-w-sm text-white bg-header", children: jsx(he, { avatar: t.image, username: `${t.firstName} ${t.lastName}`, navigation: v, email: t.email }) })] }) })] }) }) }) : null;
}
function me({ href: t, active: a, children: s, comingSoon: n, httpKey: i, queryFn: o }) {
  const p = useQueryClient();
  return n ? jsx(ne, { children: jsxs(le, { children: [jsx(oe, { children: jsx(Link, { href: "#", className: `relative px-3 py-2 rounded-md text-sm font-medium ${a ? "bg-gray-700 text-white" : n ? "text-gray-500 hover:bg-gray-700 hover:text-gray-500" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`, children: s }) }), jsx(A, { children: "Coming Soon" })] }) }) : jsx(Link, { href: t, className: `px-3 py-2 rounded-md text-sm font-medium ${a ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`, onMouseEnter: async () => {
    !i || !o || await p.prefetchQuery({ queryKey: i, queryFn: o });
  }, children: s });
}
function ce({ avatar: t, username: a, email: s }) {
  const i = useRouterState().location.pathname, o = d$1();
  return jsxs(I, { children: [jsx(C, { asChild: true, children: jsx("div", { className: "h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center", children: jsx("img", { className: "h-10 w-10 rounded-full", src: t, alt: `${a}'s avatar`, width: 40, height: 40 }) }) }), jsxs(b, { align: "end", className: "w-56 p-2", children: [jsxs("div", { className: "flex gap-2 items-center", children: [jsx("img", { className: "h-10 w-10 rounded-full", src: t, alt: `${a}'s avatar`, width: 40, height: 40 }), jsxs("div", { className: "flex flex-col", children: [jsx("h3", { className: "text-sm font-medium", children: a }), jsx("p", { className: "text-sm text-muted-foreground", children: s })] })] }), jsx(N, { className: "my-2" }), jsx(w, { asChild: true, children: jsxs(Link, { href: "/settings/profile", className: "flex items-center", onMouseEnter: async () => {
    console.log("prefetch"), i !== "/settings/profile" && await o.prefetch();
  }, children: [jsx(User, { className: "mr-2 h-4 w-4" }), jsx("span", { children: "Profile" })] }) }), jsx(w, { asChild: true, children: jsxs(Link, { href: "/settings/household", className: "flex items-center", children: [jsx(House, { className: "mr-2 h-4 w-4" }), jsx("span", { children: "Household" })] }) }), jsx(N, { className: "my-2" }), jsxs(w, { className: "w-full h-8", children: [jsx(RxExit, { className: "mr-2 h-4 w-4" }), jsx(SignOutButton, {})] })] })] });
}
function he({ avatar: t, username: a, navigation: s, email: n }) {
  return jsxs("div", { className: "pt-5 pb-3 space-y-1 bg-header", children: [jsxs("div", { className: "flex items-center px-4 mb-8", children: [jsx("div", { className: "h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center", children: jsx("img", { className: "h-10 w-10 rounded-full", src: t, alt: `${a}'s avatar`, width: 40, height: 40 }) }), jsxs("div", { className: "ml-3", children: [jsx("h3", { className: "text-base font-medium text-gray-800 dark:text-white", children: a }), jsx("p", { className: "text-sm text-muted-foreground", children: n })] })] }), jsxs("div", { className: "flex flex-col space-y-2", children: [jsx(m, { href: "/lists", icon: jsx(ClipboardList, { className: "h-6 w-6" }), children: jsx(d, { children: "Lists" }) }), jsx(m, { href: "/items", icon: jsx(List, { className: "h-6 w-6" }), children: jsx(d, { children: "Items" }) }), jsx(m, { href: "/plans", icon: jsx(Calendar, { className: "h-6 w-6" }), comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true", children: jsx(d, { children: "Meal plans" }) }), jsx(m, { href: "/meals", icon: jsx(Drumstick, { className: "h-6 w-6" }), comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true", children: jsx(d, { children: "Meals" }) }), jsx(m, { href: x[0].href, icon: jsx(Settings, { className: "h-6 w-6" }), children: jsx(d, { children: "Settings" }) }), jsx(m, { href: x[0].href, icon: jsx(CgProfile, { className: "h-6 w-6 ml-4" }), children: jsx(d, { children: "Profile" }) }), jsx(m, { href: x[1].href, icon: jsx(House, { className: "h-6 w-6 ml-4" }), children: jsx(d, { children: "Household" }) }), jsx("div", { className: "px-4 pt-4", children: jsx(g, { className: "w-full h-10 mt-2", variant: "destructive", children: jsx(SignOutButton, {}) }) })] })] });
}
function m({ href: t, icon: a, children: s, comingSoon: n }) {
  return jsx(Link, { href: n ? "#" : t, className: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-4 py-2 rounded-md text-base", children: jsxs("span", { className: "flex items-center", children: [a, jsx("span", { className: `ml-3 ${n ? "text-muted-foreground" : ""}`, children: s }), n && jsx("span", { className: "ml-3 text-xs text-muted-foreground", children: "(Coming Soon)" })] }) });
}
function fe({ children: t, user: a }) {
  return jsxs("div", { className: "min-h-screen flex flex-col relative", children: [jsx(de, { currentUser: a }), jsxs("main", { className: "", children: [jsx("div", { className: "absolute top-0 left-0 right-0 h-[300px] bg-header", "aria-hidden": "true" }), jsxs("div", { className: "relative z-10 max-w-7xl mx-auto md:px-4 lg:px-8 min-h-full", children: [jsx("div", { className: "h-20 md:h-20 flex items-center", children: jsx("div", { children: jsx("div", { className: "md:hidden flex gap-2 items-center", children: jsx("div", { className: "w-full flex justify-between px-2 md:px-3 md:mt-3" }) }) }) }), jsx("div", { className: "bg-background md:bg-white md:rounded-lg md:shadow-lg overflow-hidden mb-80", children: jsx("div", { className: "px-0 py-0 md:px-4 md:py-5 sm:p-6", children: t }) })] })] }), jsxs("div", { className: "absolute w-full flex flex-col justify-center items-center py-3 gap-2 bottom-2", children: [jsx("a", { href: "https://github.com/bernardmuller/munchies", target: "_blank", rel: "noreferrer", children: jsx(FaGithub, { className: "w-6 h-6" }) }), jsx("p", { className: "text-sm text-gray-400 text-center", children: "\xA9 2024 Munchies. All rights reserved." })] })] });
}
const ue = new QueryClient();
function pe() {
  const { isFetching: t, isAbsent: a, currentUser: s } = _();
  return t && a && !s ? jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-header text-gray-100", children: [jsx(Loader2, { className: "w-16 h-16 animate-spin" }), jsx("span", { className: "text-2xl font-bold", children: "Loading..." })] }) : jsx(fe, { user: s, children: jsx(Outlet, {}) });
}
const Ge = () => jsxs(QueryClientProvider, { client: ue, children: [jsx(pe, {}), jsx(ReactQueryDevtoolsPanel, {})] });

export { Ge as component };
//# sourceMappingURL=_authed-CR3sNgj0.mjs.map
