"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type RegisterUserInputs = {
  userId: string;
};

async function registerUser({ userId }: RegisterUserInputs) {
  return await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}users/import`,
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

    console.log(res);

    if (res.Status === "success") {
      router.push("/lists");
    }
  };

  useEffect(() => {
    if (!userId) return;
    registerUserOnBackend();
  }, [userId]);

  return (
    <section className="w-full flex justify-center h-screen items-center bg-header text-white text-2xl font-bold">
      Getting things ready...
    </section>
  );
}
