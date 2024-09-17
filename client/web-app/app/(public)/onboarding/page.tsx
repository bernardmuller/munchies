"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type RegisterUserInputs = {
  userId: string;
};

export async function registerUser({ userId }: RegisterUserInputs) {
  return await axios({
    method: "POST",
    url: `http://localhost:8001/users/import`,
    // headers: await requireHeaders(),
    data: {
      userId,
    },
  }).then((response) => response.data);
}

export default function OnboardingPage() {
  const { getToken, userId } = useAuth();
  const router = useRouter();

  getToken().then((r) => console.log(r));
  const registerUserOnBackend = async () => {
    if (!userId) return;
    const res = await registerUser({ userId });

    if (res.Status === "success") {
      // save JWT
      // figure out how to send it to server
      // validate it on the server with middleware
      // create new jwt on server
      // use that to auth users

      router.push("/home");
    }
  };

  useEffect(() => {
    registerUserOnBackend();
  }, [userId]);

  return (
    <section className="w-full flex justify-center h-screen items-center bg-black text-white text-xl">
      Getting things ready...
    </section>
  );
}
