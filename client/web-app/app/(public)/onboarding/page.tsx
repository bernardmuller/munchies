"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
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

  const registerUserOnBackend = async () => {
    if (!userId) return;
    const res = await registerUser({ userId });
    console.log("register user => ", res);
  };

  useEffect(() => {
    registerUserOnBackend();
  }, [userId]);

  console.log(userId);
  return (
    <section className="w-full flex justify-center h-screen items-center bg-black text-white text-xl">
      Getting things ready...
    </section>
  );
}
