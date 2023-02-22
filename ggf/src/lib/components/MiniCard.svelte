<script lang="ts">
	import type { Blog } from "$lib/types/models";
	import { browser } from "$app/environment";
	export let blog: Blog = {
		body: "",
		city: "",
		country: "",
		image: "",
		title: ""
	};
	function showDetails(id: string) {
		if (browser) {
			let num = parseInt(localStorage.getItem(`blog_counter_${id}`) || "0");
			num++;
			localStorage.setItem(`blog_counter_${id}`, num.toString());
		}
	}
</script>

<a href="/blog/{blog.id}" on:click={() => showDetails(blog.id)}>
	<article
		class="w-[150px] bg-grey p-5 hover:drop-shadow-[0_0.1rem_1rem_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 cursor-pointer"
	>
		<h3 class="font-mont font-bold text-black">{blog.title}</h3>
		<span class="font-mont text-xs font-light text-black">{blog.city} - {blog.country}</span>
	</article>
</a>
