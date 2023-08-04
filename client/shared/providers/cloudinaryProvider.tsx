import React, { useState } from "react";
// import { Image } from "cloudinary-react";

export const cloudinaryConfig = {
	cloud_name: "munchiesapp",
};

export function ImageUpload() {
	const [imageURL, setImageURL] = useState("");

	const handleImageUpload = async (e: any) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "m1npbppd"); // Create this on the Cloudinary dashboard

		try {
			const response = await fetch(
				"https://api.cloudinary.com/v1_1/munchiesapp/image/upload",
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await response.json();
			setImageURL(data.url);
		} catch (error) {
			console.error("Error uploading the image: ", error);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleImageUpload} />
		</div>
	);
}
