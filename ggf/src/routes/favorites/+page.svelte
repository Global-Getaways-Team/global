<script lang="ts">
	import type { PageData } from "./$types";
	import Card from "$lib/components/Card.svelte";

	export let data: PageData;
</script>

<svelte:head>
	<title>Favoriten</title>
	<meta name="description" content="Hier befinden sich alle deinen Favoriten" />
</svelte:head>

<section class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
	{#if data.blogs.length > 0}
		{#each data.blogs as blog (blog.blog.id)}
			<Card blog={blog.blog} />
		{/each}
	{:else}
		<span>Du hast noch keine Favoriten. Schaue dich doch <a href="/blog" class="">um</a> </span>
	{/if}
</section>
