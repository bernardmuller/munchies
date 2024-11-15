import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import * as l from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { m as m$1 } from './utils-bhneXptQ.mjs';

const D = l.Root, h = l.Trigger, f = l.Portal, v = l.Close, r = React.forwardRef(({ className: a, ...t }, o) => jsx(l.Overlay, { ref: o, className: m$1("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", a), ...t }));
r.displayName = l.Overlay.displayName;
const m = React.forwardRef(({ className: a, children: t, ...o }, l$1) => jsxs(f, { children: [jsx(r, {}), jsxs(l.Content, { ref: l$1, className: m$1("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", a), ...o, children: [t, jsxs(l.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [jsx(X, { className: "h-4 w-4" }), jsx("span", { className: "sr-only", children: "Close" })] })] })] }));
m.displayName = l.Content.displayName;
const p = ({ className: a, ...t }) => jsx("div", { className: m$1("flex flex-col space-y-1.5 text-center sm:text-left", a), ...t });
p.displayName = "DialogHeader";
const g = React.forwardRef(({ className: a, ...t }, o) => jsx(l.Title, { ref: o, className: m$1("text-lg font-semibold leading-none tracking-tight", a), ...t }));
g.displayName = l.Title.displayName;
const u = React.forwardRef(({ className: a, ...t }, o) => jsx(l.Description, { ref: o, className: m$1("text-sm text-muted-foreground", a), ...t }));
u.displayName = l.Description.displayName;
const b = React.forwardRef(({ className: a, type: t, ...o }, l) => jsx("input", { type: t, className: m$1("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", a), ref: l, ...o }));
b.displayName = "Input";

export { D, b, g, h, m, p, u, v };
//# sourceMappingURL=input-DPMfAGGT.mjs.map
