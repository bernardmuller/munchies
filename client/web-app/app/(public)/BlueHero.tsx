"use client";
import { HomeParticles } from "@/components/custom/Particles";

const BlueHero = ({
	size = "lg",
	glow,
	particles,
}: {
	glow?: boolean;
	particles?: boolean;
	size: "sm" | "lg";
}) => {
	return (
		<div
			className={`bg-header w-full ${
				size === "lg" ? "h-[80vh] md:h-[50vh]" : "h-[25rem]"
			} absolute top-0 left-0 overflow-hidden z-0`}
		>
			{glow && (
				<>
					<div className="h-[30rem] w-[30rem] rounded-full bg-primary opacity-20 blur-[6rem] absolute left-[-14rem] top-[-14rem]" />
					<div className="h-[30rem] w-[30rem] rounded-full bg-primary opacity-30 blur-[8rem] absolute right-[-20rem] bottom-[-20rem]" />
					<div className="h-[30rem] w-[30rem] rounded-full bg-[#FFB572]/30 blur-[10rem] absolute left-[60%] top-[-24rem]" />
				</>
			)}
			{particles && <HomeParticles />}
		</div>
	);
};

export default BlueHero;
