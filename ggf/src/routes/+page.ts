import type { PageLoad } from "./$types";
import type { Guest, Blog } from "$lib/types/models";
import { browser } from "$app/environment";

export const load = (async ({ fetch }) => {
	if (!browser) return { blogs: [] };
	const isPresent = localStorage.getItem("global_getaways_guest_id");
	if (isPresent === "" || isPresent === null) {
		const res = await fetch("http://localhost:8080/api/guest/create", {
			method: "POST",
			credentials: "include"
		});
		const g: Guest = await res.json();
		localStorage.setItem("global_getaways_guest_id", g.id);
		console.log(g.id);
	}
	// get the recent blogs that are the guest visited >2
	const keys = Object.keys(localStorage).filter((key) => {
		const regexp = new RegExp(
			"^blog_counter_[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$"
		);
		return regexp.test(key);
	});

	//TODO keine gute performance damit, weil alles 2 mal gemacht wird
	const arr = keys.map((key) => {
		const id = 2;
		const counter = parseInt(localStorage.getItem(key));
		if (counter >= 2) {
			return key.split("_")[id];
		}
		return null;
	});

	let blogIds = arr.filter((value) => {
		return value !== null;
	});

	if (blogIds.length > 4) {
		blogIds = blogIds.slice(0, 4);
	}

	const res = blogIds.map(async (id) => {
		const resp = await fetch(`http://localhost:8080/api/blog/single/${id}`, {
			method: "GET",
			credentials: "include"
		});
		const data: Blog = await resp.json();
		return data;
	});

	let blogs = await Promise.all(res);
	blogs = blogs.filter((v) => {
		return v !== null;
	});
	return { blogs };
}) satisfies PageLoad;
