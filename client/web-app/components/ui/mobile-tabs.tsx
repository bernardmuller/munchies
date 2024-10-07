import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const MobileTabs = TabsPrimitive.Root;

const MobileTabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"flex overflow-x-auto bg-transparent p-1 rounded-lg",
			className
		)}
		{...props}
	/>
))
MobileTabsList.displayName = TabsPrimitive.List.displayName

const MobileTabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors",
			"text-gray-500 hover:text-gray-700",
			"data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
			className
		)}
		{...props}
	/>
))
MobileTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const MobileTabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className
		)}
		{...props}
	/>
))
MobileTabsContent.displayName = TabsPrimitive.Content.displayName

export { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent };
