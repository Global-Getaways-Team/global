import type { PageLoad } from "./$types";
import type { Blog } from "$lib/types/models";

export const load = (async ({ fetch }) => {
	const data = await fetch("http://localhost:8080/api/blog/all", {
		method: "GET",
		credentials: "include"
	});

	let blogs: Blog[] = await data.json();
	blogs = blogs.filter((v) => {
		return v !== null;
	});
	return { blogs };
}) satisfies PageLoad;
