/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
	dest: "public",
});

module.exports = withPWA({
	images: {
		domains: [
			"images.unsplash.com",
			"res.cloudinary.com",
			"ui-avatars.com",
			"img.clerk.com"
		],
	},
});
