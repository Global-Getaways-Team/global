<script lang="ts">
	import type { Blog } from "$lib/types/models";
	import { browser } from "$app/environment";
	export let blog: Blog;
	function cut(text: string): string {
		if (text.length <= 200) return `${text}...`;
		const shorted = text.slice(0, 300);
		return `${shorted}...`;
	}

	function showDetails(id: string) {
		if (browser) {
			let num = parseInt(localStorage.getItem(`blog_counter_${id}`) || "0");
			num++;
			localStorage.setItem(`blog_counter_${id}`, num.toString());
		}
	}
</script>

<a href="/blog/{blog.id}" on:click={() => showDetails(blog.id)}>
	<section
		class="w-[350px] bg-grey p-5 hover:drop-shadow-[0_0.1rem_1rem_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 cursor-pointer"
	>
		<img src={blog.image} alt="Ein Bild das die Erfahrung im Blog veranschaulicht." />
		<article class="mt-4">
			<h3 class="font-mont font-bold text-black">{blog.title}</h3>
			<span class="font-mont text-xs font-light text-black">{blog.city} - {blog.country}</span>

			<hr class="opacity-20 bg-black" />
			<p class="mt-1 font-sans text-black text-justify overflow-hidden">
				{cut(blog.body)}
			</p>
		</article>
	</section>
</a>
