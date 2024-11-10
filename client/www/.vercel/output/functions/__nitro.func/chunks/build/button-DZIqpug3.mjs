import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { m } from './utils-bhneXptQ.mjs';
import { Loader2 } from 'lucide-react';

const b = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", outline: "border border-[1px] border-input bg-white hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } }), g = React.forwardRef(({ className: r, variant: t, color: v, size: o, isLoading: e, children: n, asChild: i = false, ...s }, a) => jsxs(i ? Slot : "button", { className: m(b({ variant: t, size: o, className: r })), ref: a, disabled: e, ...s, children: [e && jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin stroke-white" }), n] }));
g.displayName = "Button";

export { b, g };
//# sourceMappingURL=button-DZIqpug3.mjs.map
