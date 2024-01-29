import { useEffect, useState } from "react";

export default function useAvatar(avatar: string): string {
	const [url, setUrl] = useState("");

	useEffect(() => {
		fetch(
			`https://ui-avatars.com/api/?name=${avatar}&background=68BF50&color=fff&size=100`
		).then((res) => setUrl(res.url));
	}, [avatar]);

	return url;
}
