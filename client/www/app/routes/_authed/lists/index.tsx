import { createFileRoute } from '@tanstack/react-router'
import GroceryLists from "@/components/Grocerylists";

export const Route = createFileRoute('/_authed/lists/')({
  component: () => {
    return <div className="w-full min-h-[50vh]">
      <GroceryLists/>
    </div>
  },
})



