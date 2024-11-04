import { createFileRoute } from '@tanstack/react-router'
import GroceryLists from "@/components/Grocerylists";
import useAppData from "@/lib/http/hooks/app-data/useAppData";

export const Route = createFileRoute('/_authed/lists/')({
  component: () => {
    return <div className="w-full min-h-[50vh]">
      <GroceryLists/>
    </div>
  },
})



