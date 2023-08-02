"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDTOSchema } from "@/types";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/authHooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

function Signup() {
	const signupMutation = useSignup();
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignupDTOSchema),
	});

	const onSubmit = (data: any) => {
		signupMutation.mutate(data, {
			onSuccess: () => {
				setSuccess(true);
			},
		});
	};

	if (success)
		return (
			<section className="w-[27rem]">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:h-[70vh] lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Account created successfully
							</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Please login to continue
							</p>
							<Button
								type="button"
								onClick={() => router.push("/login")}
							>
								Login
							</Button>
						</div>
					</div>
				</div>
			</section>
		);

	return (
		<section className="w-[27rem]">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:h-[70vh] lg:py-0">
				<Link
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					{/*
          <Image
            className="w-8 h-8 mr-2"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width="32"
            height="32"
          />
          */}
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="grid gap-2">
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-900 dark:text-white"
								>
									Firstname
								</label>
								<Input
									type="firstName"
									id="firstName"
									className="input w-full"
									placeholder="John"
									{...register("firstName")}
								/>
								{errors.firstName && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.firstName?.message as string}
									</p>
								)}
							</div>
							<div className="grid gap-2">
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-900 dark:text-white"
								>
									Lastname
								</label>
								<Input
									type="lastName"
									id="lastName"
									placeholder="Doe"
									className="input w-full"
									{...register("lastName")}
								/>
								{errors.lastName && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.lastName?.message as string}
									</p>
								)}
							</div>

							<div className="grid gap-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-900 dark:text-white"
								>
									Email
								</label>
								<Input
									type="email"
									id="email"
									className="input w-full"
									placeholder="name@company.com"
									{...register("email")}
								/>
								{errors.email && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.email?.message as string}
									</p>
								)}
							</div>
							<div className="grid gap-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<Input
									{...register("password")}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="input w-full "
								></Input>
								{errors.password && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.password?.message as string}
									</p>
								)}
							</div>
							<Button type="submit" className="btn w-full">
								Sign up
							</Button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link href="/login" className="link">
									Log in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Signup;
