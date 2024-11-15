import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { y as y$1, p, $ } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';

const y = 1, _ = 1e6;
let i = 0;
function l() {
  return i = (i + 1) % Number.MAX_VALUE, i.toString();
}
const c = /* @__PURE__ */ new Map(), S = (t) => {
  if (c.has(t)) return;
  const e = setTimeout(() => {
    c.delete(t), n({ type: "REMOVE_TOAST", toastId: t });
  }, _);
  c.set(t, e);
}, E = (t, e) => {
  switch (e.type) {
    case "ADD_TOAST":
      return { ...t, toasts: [e.toast, ...t.toasts].slice(0, y) };
    case "UPDATE_TOAST":
      return { ...t, toasts: t.toasts.map((s) => s.id === e.toast.id ? { ...s, ...e.toast } : s) };
    case "DISMISS_TOAST": {
      const { toastId: s } = e;
      return s ? S(s) : t.toasts.forEach((o) => {
        S(o.id);
      }), { ...t, toasts: t.toasts.map((o) => o.id === s || s === void 0 ? { ...o, open: false } : o) };
    }
    case "REMOVE_TOAST":
      return e.toastId === void 0 ? { ...t, toasts: [] } : { ...t, toasts: t.toasts.filter((s) => s.id !== e.toastId) };
  }
}, r = [];
let a = { toasts: [] };
function n(t) {
  a = E(a, t), r.forEach((e) => {
    e(a);
  });
}
function g({ ...t }) {
  const e = l(), s = (u) => n({ type: "UPDATE_TOAST", toast: { ...u, id: e } }), o = () => n({ type: "DISMISS_TOAST", toastId: e });
  return n({ type: "ADD_TOAST", toast: { ...t, id: e, open: true, onOpenChange: (u) => {
    u || o();
  } } }), { id: e, dismiss: o, update: s };
}
function h() {
  const [t, e] = React.useState(a);
  return React.useEffect(() => (r.push(e), () => {
    const s = r.indexOf(e);
    s > -1 && r.splice(s, 1);
  }), [t]), { ...t, toast: g, dismiss: (s) => n({ type: "DISMISS_TOAST", toastId: s }) };
}
const d = async (t) => {
  const e = await $(t);
  return e.data ? e.data : null;
};
function R() {
  const { getToken: t } = useAuth(), e = t({ template: "1_HOUR" }).then((o) => o == null ? void 0 : o.toString());
  return { ...useQuery({ queryKey: y$1.categories, queryFn: async () => d(await e), enabled: !!e, staleTime: p }), queryFn: d };
}

export { R, h };
//# sourceMappingURL=useCategories-BU-wEToM.mjs.map
