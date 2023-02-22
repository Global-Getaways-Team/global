import type { PageLoad } from "./$types";
import type { Blog } from "$lib/types/models";

export const load = (async ({ fetch }) => {
	let blogs: Blog[] = await fetch("http://localhost:8080/api/blog/all", {
		method: "GET",
		credentials: "include"
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));

	if (blogs === undefined || blogs === null) return { blogs: [] };

	blogs = blogs.filter((v) => {
		return v !== null;
	});
	return { blogs };
}) satisfies PageLoad;
