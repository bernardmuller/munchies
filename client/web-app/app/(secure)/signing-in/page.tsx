"use client";

import {useAuth} from "@clerk/nextjs";
import axios from "axios";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

type RegisterUserInputs = {
  userId: string;
};

export default function SigningInPage() {
  const {userId} = useAuth();
  const router = useRouter();

  const signUserInAndSaveDetails = async () => {
    if (!userId) return;

    router.push("/lists");
  };

  useEffect(() => {
    // if (!userId) return;
    signUserInAndSaveDetails();
  }, [userId]);

  return (
    <section className="w-full flex justify-center h-screen items-center bg-header text-white text-2xl font-bold">
      Signing in...
    </section>
  );
}
