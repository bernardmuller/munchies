"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BlueHero from "./BlueHero";
import Image from "next/image";

import arrow from "@/assets/arrow.gif";
import preview from "@/assets/munchies_preview.png";
// import phone_preview from "@/assets/phone.png";

export default function Home() {
	// const router = useRouter();

	// useEffect(() => {
	// 	router.push("/login");
	// }, []);

	return (
		<div className="">
			<div className="pt-4 flex justify-between w-full items-center px-[17.5%] prose min-w-full z-50">
				<h1 className="text-2xl mb-0 z-10">Munchies</h1>
				<Link
					href="/login"
					className="btn disabled bg-primary_400 text-white border-none shadow-idle z-10 px-8 hover:bg-primary_300 shadow-primary"
				>
					Login
				</Link>
			</div>
			<div className="w-full min-w-full px-[17.5%] flex mt-36 justify-between ">
				<BlueHero glow particles size="lg" />
				<div className="w-3/8 prose py-4 z-10 flex flex-col justify-evenly">
					<h2 className="text-[50px] leading-[5rem] pt-5">
						The all-in-one grocery list manager.
					</h2>
					<p className="text-[1.4rem] leading-[2.4rem] text-slate-400">
						Say goodbye to messy, disorganized grocery lists! <br />{" "}
						<strong className="text-primary_300">Munchies</strong>{" "}
						creates and manages them for you. Not only will you save
						time and effort with, but you'll also never forget an
						item at the store again.
					</p>
				</div>
				<div className="flex drop-shadow-2xl z-10">
					<div className="w-full relative rounded-3xl drop-shadow-2xl">
						<div className="max-h-[540px] w-[250px] overflow-scroll rounded-3xl scrollbar-hide ">
							<Image
								src={preview}
								alt={"preview"}
								className="w-full"
							/>
						</div>
						<div className="w-full max-w-[350px]">
							<Image
								src={""}
								alt={"phone"}
								className="w-full absolute min-w-[350px] -top-6 -left-7 pointer-events-none"
							/>
						</div>
						<div className="w-[3rem] absolute bottom-[1rem] opacity-30 left-[6.3rem]">
							<Image src={arrow} alt="arrow" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
