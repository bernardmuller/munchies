"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SomethingWentWrong() {
  const router = useRouter();
  return (
    <div className="min-h-[50vh] flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-6xl font-bold">Oops</h3>
        <span>Something unexpected happened.</span>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/lists")}>
            Go Home
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
