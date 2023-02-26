import type { PageLoad } from "./$types";
import type { Blog, Comment, Favorite } from "$lib/types/models";
import { browser } from "$app/environment";

export const load = (async ({ params, fetch }) => {
	const empty: { blog: Blog; comments: Comment[]; favorite: Favorite } = {
		blog: {
			body: "",
			city: "",
			country: "",
			image: "",
			title: ""
		},
		comments: [],
		favorite: {}
	};
	if (!browser) return empty;
	try {
		const resBlog = await fetch(`http://localhost:8080/api/blog/single/${params.id}`, {
			credentials: "include",
			method: "GET"
		});

		const resComments = await fetch(`http://localhost:8080/api/comment/list/${params.id}`, {
			credentials: "include",
			method: "GET"
		});

		const resFavorite = await fetch(`http://localhost:8080/api/favorite/single/${params.id}`, {
			credentials: "include",
			method: "GET"
		});

		const favorite: Favorite = await resFavorite.json();
		const blog: Blog = await resBlog.json();
		const comments: Comment[] = await resComments.json();

		return { blog, comments, favorite };
	} catch (error) {
		console.log(error);
	}
}) satisfies PageLoad;
