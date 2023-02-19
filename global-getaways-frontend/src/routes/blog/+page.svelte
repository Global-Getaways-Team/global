<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import type { Blog } from "$lib/types/models";
	import { onMount } from "svelte";
	let blogs: Blog[] = [];

	onMount(async () => {
		const data = await fetch("http://localhost:8080/api/blog/all", {
			method: "GET",
			credentials: "include"
		});
		blogs = await data.json();
	});
</script>

<svelte:head>
	<title>Blogbeiträge</title>
	<meta name="description" content="Die Blogbeiträge der Global Getaways" />
</svelte:head>

<div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
	{#each blogs as blog (blog.id)}
		<Card {blog} />
	{/each}
</div>
