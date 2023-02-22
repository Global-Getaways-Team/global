import type { PageLoad } from "./$types";
import type { Blog, Comment, Favorite } from "$lib/types/models";

export const load = (async ({ params, fetch }) => {
	const resBlog = await fetch(`http://localhost:8080/api/blog/single/${params.id}`, {
		credentials: "include",
		method: "GET"
	});

	const resComment = await fetch(`http://localhost:8080/api/comment/list/${params.id}`, {
		credentials: "include",
		method: "GET"
	});

	const resFavorite = await fetch(`http://localhost:8080/api/favorite/single/${params.id}`, {
		credentials: "include",
		method: "GET"
	});

	const comments: Comment[] = await resComment.json();
	const favorite: Favorite = await resFavorite.json();
	const blog: Blog = await resBlog.json();

	return { blog, comments, favorite };
}) satisfies PageLoad;
