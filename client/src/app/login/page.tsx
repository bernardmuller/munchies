"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDTOSchema } from "@/types";
import { useLogin } from "@/hooks/authHooks";

function Login() {
	const loginMutation = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginDTOSchema),
	});

	const onSubmit = (data: any) => {
		loginMutation.mutate(data);
	};

	return (
		<section className="bg-white_d dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
							Sign in to your account
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
									Your email
								</label>
								<input
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
								<input
									{...register("password")}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="input w-full "
								></input>
								{errors.password && (
									<p className="prose-p: text-xs text-red-400">
										{errors?.password?.message as string}
									</p>
								)}
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											disabled
											id="remember"
											aria-describedby="remember"
											type="checkbox"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
								<a href="#" className="link">
									Forgot password?
								</a>
							</div>
							<button type="submit" className="btn w-full">
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link href="#" className="link">
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

export default Login;
