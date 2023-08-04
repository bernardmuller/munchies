"use client";

import React, { useEffect } from "react";
import ConfettiComponent from "react-confetti";

function Confetti() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	useEffect(() => {
		setTimeout(() => {
			if (typeof window !== "undefined") {
				localStorage.setItem("confetti", "false");
			}
		}, 5000);
	}, []);
	return <ConfettiComponent width={width} recycle={false} height={height} />;
}

export default Confetti;
