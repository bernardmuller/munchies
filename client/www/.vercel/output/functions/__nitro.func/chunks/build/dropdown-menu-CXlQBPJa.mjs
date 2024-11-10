import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import * as e from '@radix-ui/react-dropdown-menu';
import { ChevronRight, Check, Circle } from 'lucide-react';
import { m } from './utils-bhneXptQ.mjs';

const I = e.Root, C = e.Trigger, f = React.forwardRef(({ className: t, inset: a, children: o, ...s }, i) => jsxs(e.SubTrigger, { ref: i, className: m("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent dark:text-white", a && "pl-8", t), ...s, children: [o, jsx(ChevronRight, { className: "ml-auto h-4 w-4" })] }));
f.displayName = e.SubTrigger.displayName;
const u = React.forwardRef(({ className: t, ...a }, o) => jsx(e.SubContent, { ref: o, className: m("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t), ...a }));
u.displayName = e.SubContent.displayName;
const b = React.forwardRef(({ className: t, sideOffset: a = 4, ...o }, s) => jsx(e.Portal, { children: jsx(e.Content, { ref: s, sideOffset: a, className: m("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t), ...o }) }));
b.displayName = e.Content.displayName;
const w = React.forwardRef(({ className: t, inset: a, ...o }, s) => jsx(e.Item, { ref: s, className: m("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", a && "pl-8", t), ...o }));
w.displayName = e.Item.displayName;
const h = React.forwardRef(({ className: t, children: a, checked: o, ...s }, i) => jsxs(e.CheckboxItem, { ref: i, className: m("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t), checked: o, ...s, children: [jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: jsx(e.ItemIndicator, { children: jsx(Check, { className: "h-4 w-4" }) }) }), a] }));
h.displayName = e.CheckboxItem.displayName;
const g = React.forwardRef(({ className: t, children: a, ...o }, s) => jsxs(e.RadioItem, { ref: s, className: m("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", t), ...o, children: [jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: jsx(e.ItemIndicator, { children: jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }), a] }));
g.displayName = e.RadioItem.displayName;
const x = React.forwardRef(({ className: t, inset: a, ...o }, s) => jsx(e.Label, { ref: s, className: m("px-2 py-1.5 text-sm font-semibold dark:text-white", a && "pl-8", t), ...o }));
x.displayName = e.Label.displayName;
const N = React.forwardRef(({ className: t, ...a }, o) => jsx(e.Separator, { ref: o, className: m("-mx-1 my-1 h-px bg-muted", t), ...a }));
N.displayName = e.Separator.displayName;

export { C, I, N, b, w };
//# sourceMappingURL=dropdown-menu-CXlQBPJa.mjs.map
