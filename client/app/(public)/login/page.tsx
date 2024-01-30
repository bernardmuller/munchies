"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDTOSchema } from "@/types";
import { useLogin } from "@/hooks/authHooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	QueryClient,
	QueryClientProvider,
	useQueryClient,
} from "@tanstack/react-query";
import BlueHero from "../BlueHero";

function LoginForm() {
	const loginMutation = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginDTOSchema),
	});

	const onSubmit = async (data: any) => {
		const res = await loginMutation.mutateAsync(data);
		console.log(res);
	};

	return (
		<section className="relative w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:h-[70vh] lg:py-0 z-40">
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
					Munchies
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Log in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit(onSubmit)}
						>
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
									className="input w-full "
								></Input>
								{errors.password && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.password?.message as string}
									</p>
								)}
							</div>
							<div className="flex items-center justify-between">
								<Link
									href="#"
									className="text-sm text-gray-500"
								>
									Forgot password?
								</Link>
							</div>
							{loginMutation.isError && (
								<p className="prose-p: text-xs text-red-400">
									Please enter a valid email and password
								</p>
							)}
							<Button
								type="submit"
								className="btn w-full"
								isLoading={loginMutation.isLoading}
							>
								Log in
							</Button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link
									href="/signup"
									className="text-black underline"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

const queryClient = new QueryClient();
function Login() {
	return (
		<QueryClientProvider client={queryClient}>
			<LoginForm />
		</QueryClientProvider>
	);
}

export default Login;
