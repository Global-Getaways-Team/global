<script lang="ts">
	import type { PageData } from "./$types";
	import Card from "$lib/components/Card.svelte";

	export let data: PageData;

	$: blogs = data.blogs;
</script>

<svelte:head>
	<title>Favoriten</title>
	<meta name="description" content="Hier befinden sich alle deinen Favoriten" />
</svelte:head>

{#if blogs.length > 0}
	<section class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
		{#each blogs as blog (blog.blog.id)}
			<Card blog={blog.blog} />
		{/each}
	</section>
{:else}
	<span>Du hast noch keine Favoriten. Schaue dich <a href="/blog" class="">hier</a> um.</span>
{/if}
