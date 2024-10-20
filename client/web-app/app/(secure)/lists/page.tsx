import {Suspense} from "react";
import {ListsSection} from "@/app/(secure)/lists/ListsPage";

export default function GrocerylistsPage() {
  return (
    <div className="w-full min-h-[50vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <ListsSection />
      </Suspense>
    </div>
  );
}
