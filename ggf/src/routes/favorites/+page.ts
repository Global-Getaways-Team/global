import type { PageLoad } from "./$types";
import type { Blog } from "$lib/types/models";
import { browser } from "$app/environment";

export const load = (async ({ fetch }) => {
	if (!browser) return { blogs: [] };

	const res = await fetch(`http://localhost:8080/api/favorite/all`, {
		method: "GET",
		credentials: "include"
	});

	if (res === undefined) return { blogs: [] };

	const blogs: { blog: Blog }[] = await res.json();

	return { blogs };
}) satisfies PageLoad;
