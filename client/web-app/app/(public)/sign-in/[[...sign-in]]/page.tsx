import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <section className="w-full flex justify-center h-screen items-center bg-black">
      <SignIn />
    </section>
  );
}
