import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BlueHero from "./BlueHero";
import Image from "next/image";

import arrow from "@/assets/arrow.gif";
import preview from "@/assets/munchies_preview.png";
import { Button, buttonVariants } from "@/components/ui/button";
// import phone_preview from "@/assets/phone.png";

function PhonePreview() {
	return (
		<div className="flex drop-shadow-2xl z-10">
			<div className="p-0.5 rounded-3xl bg-gray-900">
				<div className="w-full relative rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] p-2 bg-gray-950">
					<div className="absolute h-8 w-1/2 top-0 bg-gray-950 z-10 left-[4.3rem] rounded-b-xl" />
					<div className="relative max-h-[548px] w-[258px] overflow-scroll rounded-2xl scrollbar-hide bg-black">
						<Image
							src={preview}
							alt={"preview"}
							className="w-full"
						/>
					</div>
					<div className="w-[3rem] absolute bottom-[1rem] opacity-30 left-[7rem]">
						<Image src={arrow} alt="arrow" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	// const router = useRouter();

	// useEffect(() => {
	// 	router.push("/login");
	// }, []);

	return (
		<div className="">
			<div className="pt-4 flex justify-between w-full items-center px-8 md:px-[17.5%] prose min-w-full z-50">
				<h1 className="text-2xl mb-0 z-10 text-white">Munchies</h1>
				<div className="z-10">
					<Link
						href="/login"
						// className="btn disabled bg-primary_400 text-white border-none shadow-idle z-10 px-8 hover:bg-primary_300 shadow-primary"
						className={buttonVariants()}
					>
						Login
					</Link>
				</div>
			</div>

			<BlueHero glow particles size="lg" />

			<div className="flex flex-col items-center md:items-start w-full px-8 lg:px-[17.5%] lg:flex-row lg:mt-36 lg:justify-between lg:gap-48">
				<div className="text-center pt-4 pb-12 md:text-left w-3/8 prose md:py-4 z-10 flex flex-col gap-8 justify-evenly">
					<h2 className="text-[40px] leading-[3rem] md:text-[80px] md:leading-[5rem] pt-5 text-white">
						The all-in-one grocery list manager.
					</h2>
					<p className="text-[1rem] leading-[1.5rem] md:text-[1.4rem] md:leading-[2.4rem] text-slate-400">
						Say goodbye to messy, disorganized grocery lists! <br />{" "}
						<strong className="text-primary_300">Munchies</strong>{" "}
						creates and manages them for you. Not only will you save
						time and effort with, but you&apos;ll also never forget
						an item at the store again.
					</p>
				</div>
				<PhonePreview />
			</div>
		</div>
	);
}
