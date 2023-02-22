<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Blogbeiträge</title>
	<meta name="description" content="Die Blogbeiträge der Global Getaways" />
</svelte:head>

{#if data.blogs.length > 0}
	<div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
		{#each data.blogs as blog (blog.id)}
			<Card {blog} />
		{/each}
	</div>
{:else}
	<span class="font-sans text-black text-xl"
		>Keine Blogbeiträge erstellt. Fange mit deinem ersten
		<a href="/blog/create" class="font-sans text-red">an</a>
	</span>
{/if}
