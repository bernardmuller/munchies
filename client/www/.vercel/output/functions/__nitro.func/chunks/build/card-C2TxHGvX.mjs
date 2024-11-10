import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import * as s from '@radix-ui/react-scroll-area';
import { m as m$1 } from './utils-bhneXptQ.mjs';

const n = React.forwardRef(({ className: e, children: r, ...a }, t) => jsxs(s.Root, { ref: t, className: m$1("relative overflow-hidden", e), ...a, children: [jsx(s.Viewport, { className: "h-full w-full rounded-[inherit]", children: r }), jsx(c, {}), jsx(s.Corner, {})] }));
n.displayName = s.Root.displayName;
const c = React.forwardRef(({ className: e, orientation: r = "vertical", ...a }, t) => jsx(s.ScrollAreaScrollbar, { ref: t, orientation: r, className: m$1("flex touch-none select-none transition-colors", r === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", e), ...a, children: jsx(s.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }) }));
c.displayName = s.ScrollAreaScrollbar.displayName;
const m = React.forwardRef(({ className: e, ...r }, a) => jsx("div", { ref: a, className: m$1("rounded-lg border bg-card text-card-foreground shadow-sm", e), ...r }));
m.displayName = "Card";
const f = React.forwardRef(({ className: e, ...r }, a) => jsx("div", { ref: a, className: m$1("flex flex-col space-y-1.5 md:p-6", e), ...r }));
f.displayName = "CardHeader";
const p = React.forwardRef(({ className: e, ...r }, a) => jsx("h3", { ref: a, className: m$1("text-2xl font-semibold leading-none tracking-tight", e), ...r }));
p.displayName = "CardTitle";
const N = React.forwardRef(({ className: e, ...r }, a) => jsx("p", { ref: a, className: m$1("text-sm text-muted-foreground", e), ...r }));
N.displayName = "CardDescription";
const x = React.forwardRef(({ className: e, ...r }, a) => jsx("div", { ref: a, className: m$1("md:p-6 pt-0", e), ...r }));
x.displayName = "CardContent";
const C = React.forwardRef(({ className: e, ...r }, a) => jsx("div", { ref: a, className: m$1("flex items-center p-6 pt-0", e), ...r }));
C.displayName = "CardFooter";

export { f, m, n, x };
//# sourceMappingURL=card-C2TxHGvX.mjs.map
