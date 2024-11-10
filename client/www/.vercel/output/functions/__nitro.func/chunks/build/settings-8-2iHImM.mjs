import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Outlet, useRouter, Link } from '@tanstack/react-router';
import { m } from './utils-bhneXptQ.mjs';
import { b, g } from './button-DZIqpug3.mjs';
import { SignOutButton } from '@clerk/tanstack-start';
import { User, House } from 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';

function x({ className: r, items: a, ...i }) {
  const o = useRouter();
  return jsx(Fragment, { children: jsxs("div", { className: "hidden md:flex flex-col items-between md:min-h-[50vh] h-[50vh]", children: [jsx("nav", { className: m("hidden md:flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:items-between lg:h-full", r), ...i, children: jsx("div", { className: "flex flex-col gap-1", children: a.map((s) => jsxs(Link, { href: s.href, className: m(b({ variant: "ghost" }), o.basepath === s.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline", "justify-start px-2 flex gap-2"), children: [s.icon, s.title] }, s.href)) }) }), jsx(g, { className: "w-full h-8", variant: "destructive", children: jsx(SignOutButton, {}) })] }) });
}
const v = [{ title: "My Profile", href: "/settings/profile", icon: jsx(User, { className: "h-5 w-5" }) }, { title: "My Household", href: "/settings/household", icon: jsx(House, { className: "h-5 w-5" }) }], F = () => jsxs("div", { className: "flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 min-h-[50vh]", children: [jsx("aside", { className: "lg:w-1/5", children: jsx(x, { items: v }) }), jsx("div", { className: "flex-1", children: jsx(Outlet, {}) })] });

export { F as component };
//# sourceMappingURL=settings-8-2iHImM.mjs.map
