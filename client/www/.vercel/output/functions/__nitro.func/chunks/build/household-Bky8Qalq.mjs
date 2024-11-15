import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useCallback } from 'react';
import { g } from './button-DZIqpug3.mjs';
import { D, h, m as m$1, p, g as g$1, v, b } from './input-DPMfAGGT.mjs';
import * as u from '@radix-ui/react-avatar';
import { m } from './utils-bhneXptQ.mjs';
import { Home, UserPlus, LogOut, Clipboard } from 'lucide-react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { _, U } from './useAppData-BtM9UegS.mjs';
import { y, p as p$1, u as u$1, i } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { z as z$1 } from 'zod';
import * as R from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { useForm } from 'react-hook-form';
import '@radix-ui/react-slot';
import '@radix-ui/react-dialog';
import 'clsx';
import 'tailwind-merge';
import './getCurrentLoggedInUser-BSklaDhP.mjs';
import './getAllIngredients-6sXcg4a7.mjs';
import './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';
import 'axios';

const j = React.forwardRef(({ className: o, ...t }, s) => jsx(u.Root, { ref: s, className: m("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", o), ...t }));
j.displayName = u.Root.displayName;
const Y = React.forwardRef(({ className: o, ...t }, s) => jsx(u.Image, { ref: s, className: m("aspect-square h-full w-full", o), ...t }));
Y.displayName = u.Image.displayName;
const A = React.forwardRef(({ className: o, ...t }, s) => jsx(u.Fallback, { ref: s, className: m("flex h-full w-full items-center justify-center rounded-full bg-muted", o), ...t }));
A.displayName = u.Fallback.displayName;
function z() {
  const { getToken: o } = useAuth(), t = o({ template: "1_HOUR" }).then((s) => s == null ? void 0 : s.toString());
  return useQuery({ queryKey: y.currentUserHouseholdDetails, queryFn: async () => {
    const s = await U(await t);
    return s.data ? s.data : null;
  }, enabled: !!t, staleTime: p$1 });
}
z$1.object({ householdId: z$1.string() });
async function V({ householdId: o, accessToken: t }) {
  return await u$1(i.joinHousehold(), "POST", { householdId: o }, { accessToken: t });
}
function W() {
  const o = useQueryClient(), { getToken: t } = useAuth();
  return useMutation({ mutationKey: ["join-household"], mutationFn: async ({ householdId: s }) => {
    const r = await t({ template: "1_HOUR" }).then((n) => n == null ? void 0 : n.toString());
    return V({ householdId: s, accessToken: r });
  }, onSuccess: () => {
    o.invalidateQueries(y.currentUserHouseholdDetails);
  } });
}
async function X({ accessToken: o }) {
  return await u$1(i.leaveHousehold(), "POST", void 0, { accessToken: o });
}
function Z() {
  const o = useQueryClient(), { getToken: t } = useAuth();
  return useMutation({ mutationKey: ["leave-household"], mutationFn: async () => {
    const s = await t({ template: "1_HOUR" }).then((r) => r == null ? void 0 : r.toString());
    return X({ accessToken: s });
  }, onSuccess: () => {
    o.invalidateQueries([...y.currentUserHouseholdDetails, ...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId]);
  } });
}
z$1.object({ id: z$1.string(), createdBy: z$1.string(), createdAt: z$1.string(), active: z$1.boolean() });
async function $({ accessToken: o }) {
  return await u$1(i.households(), "POST", void 0, { accessToken: o });
}
function ee() {
  const o = useQueryClient(), { getToken: t } = useAuth();
  return useMutation({ mutationKey: ["create-household"], mutationFn: async () => {
    const s = await t({ template: "1_HOUR" }).then((r) => r == null ? void 0 : r.toString());
    return $({ accessToken: s });
  }, onSuccess: () => {
    o.invalidateQueries(y.currentUserHouseholdDetails);
  } });
}
function oe() {
  const [o, t] = useState(null), s = useCallback(async (r) => {
    if (!(navigator == null ? void 0 : navigator.clipboard)) return console.warn("Clipboard not supported"), false;
    try {
      return await navigator.clipboard.writeText(r), t(r), true;
    } catch (n) {
      return console.warn("Copy failed", n), t(null), false;
    }
  }, []);
  return [o, s];
}
const te = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"), L = React.forwardRef(({ className: o, ...t }, s) => jsx(R.Root, { ref: s, className: m(te(), o), ...t }));
L.displayName = R.Root.displayName;
function se({ trigger: o, onSubmit: t }) {
  const { handleSubmit: s, register: r, formState: n } = useForm();
  return jsxs(D, { children: [jsx(h, { asChild: true, children: o }), jsxs(m$1, { children: [jsx(p, { children: jsx(g$1, { children: "Join an Existing Household" }) }), jsxs("form", { onSubmit: s(t), className: "space-y-4", children: [jsxs("div", { className: "space-y-2", children: [jsx(L, { htmlFor: "household-id", children: "Household ID" }), jsx(b, { id: "household-id", ...r("householdId"), placeholder: "Enter household ID", required: true }), n.errors.householdId && jsx("p", { className: "text-sm text-red-500", children: "Please enter a valid Household ID" })] }), jsx(g, { type: "submit", className: "w-full", children: "Join Household" })] })] })] });
}
function ae() {
  const { data: o } = z(), t = ee(), s = W(), r = Z(), [n, U] = oe(), [O, N] = useState(false), F = async (i) => {
    await s.mutateAsync({ householdId: i.householdId });
  }, P = async () => {
    U(o.id).catch((i) => {
      console.error("Failed to copy!", i);
    }), N(true), setTimeout(() => N(false), 2e3);
  };
  return !o || !(o == null ? void 0 : o.id) ? jsxs("div", { className: " mx-auto max-w-md", children: [jsx("h2", { className: "text-2xl font-bold text-center mb-1", children: "My Household" }), jsx("h4", { className: "text-md text-center mb-4 self-center px-4 text-gray-500", children: "Get started by creating a household or join an existing one. When part of a household you can share a grocery list with other members." }), jsxs("div", { className: "space-y-4", children: [jsxs(g, { className: "w-full", onClick: () => t.mutateAsync(), isLoading: t.isPending, children: [jsx(Home, { className: "mr-2 h-4 w-4" }), " Create Household"] }), jsx(se, { trigger: jsxs(g, { variant: "outline", className: "w-full", children: [jsx(UserPlus, { className: "mr-2 h-4 w-4" }), " Join Household"] }), onSubmit: F })] })] }) : jsx("div", { className: "bg-white p-4 md:p-0 rounded-lg md:rounded-0 mx-2 md:mx-0", children: jsxs("div", { className: "space-y-6", children: [jsxs("div", { className: "flex justify-between items-center", children: [jsx("h2", { className: "text-2xl font-bold", children: "My Household" }), jsxs(D, { children: [jsx(h, { asChild: true, children: jsxs(g, { variant: "destructive", isLoading: r.isPending, children: [jsx(LogOut, { className: "mr-2 h-4 w-4" }), " Leave"] }) }), jsxs(m$1, { children: [jsx(p, { children: jsx(g$1, { children: "Leave Household" }) }), jsxs("div", { children: [jsx("div", { className: "mb-8", children: jsx("h2", { className: "text-sm mb-2", children: "Are you sure you want to leave your household?" }) }), jsxs("div", { className: "w-full flex justify-end gap-2 items-center", children: [jsx(v, { children: jsx(g, { variant: "outline", children: "No, Cancel" }) }), jsx(v, { children: jsxs(g, { variant: "destructive", onClick: () => r.mutateAsync(), isLoading: r.isPending, children: [jsx(LogOut, { className: "mr-2 h-4 w-4" }), " Yes, Leave"] }) })] })] })] })] })] }), jsxs("div", { children: [jsx("h3", { className: "text-lg font-semibold mb-3", children: "Members" }), jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: o.members.map((i) => jsxs("div", { className: "flex items-center space-x-3 bg-gray-50 p-3 rounded-md", children: [jsx(j, { children: jsxs(A, { children: [i.firstname[0], i.lastname[0]] }) }), jsxs("span", { className: "font-medium", children: [i.firstname, " ", i.lastname] })] }, i.id)) })] }), jsxs("div", { children: [jsx("h3", { className: "text-lg font-semibold mb-3", children: "Invite New Members" }), jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: jsxs("div", { className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2", children: [jsx(b, { value: o.id, readOnly: true, className: "flex-grow" }), jsxs(g, { variant: "outline", onClick: P, children: [O ? jsx(UserPlus, { className: "mr-2 h-4 w-4" }) : jsx(Clipboard, { className: "mr-2 h-4 w-4" }), n ? "Copied!" : "Copy"] })] }) }), jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Share this ID with others to invite them to your household." })] })] }) });
}
const ke = () => {
  const { isLoading: o } = _();
  return o ? jsx("div", { children: "Loading..." }) : jsx(ae, {});
};

export { ke as component };
//# sourceMappingURL=household-Bky8Qalq.mjs.map
