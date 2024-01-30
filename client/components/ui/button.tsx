import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"text-white h-10 px-8 min-w-48 py-2 bg-primary hover:bg-primary/90",
				secondary:
					"text-black h-10 px-8 min-w-[130px] py-2 bg-slate-200 hover:bg-slate-200/80",
				destructive:
					"text-white h-10 px-8 min-w-[130px] py-2 bg-red hover:bg-red/90",
				icon: "max-w-10 max-h-10 h-10 w-10 p-2.5 text-black bg-slate-200 hover:bg-slate-200/80",
				outline:
					"text-primary h-10 px-8 py-2 bg-transparent border-2 border-primary hover:bg-white/10 ",
				link: "text-purple/80 h-10 py-2 bg-transparent hover:bg-white/10 hover:underline",
				ghost: "text-black h-10 bg-transparent hover:bg-white/10",
			},
			size: {
				lg: "h-11 px-20 py-6 text-[1.1rem]",
			},
			color: {
				primary: "text-white bg-purple hover:bg-primary/90",
				secondary: "text-white bg-red hover:bg-red/90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	color?: "primary" | "secondary";
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
