<script lang="ts">
	import MiniCard from "$lib/components/MiniCard.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Global Getaways</title>
	<meta name="description" content="Homepage der Global Getaways" />
</svelte:head>

{#if data.blogs.length > 0}
	<h2 class="font-mont text-black text-2xl font-black">Diese Beiträge scheinen dir zu gefallen: </h2>
	<section class="flex gap-3 mt-4">
		{#each data.blogs as blog}
			<MiniCard {blog} />
		{/each}
	</section>
{/if}

<section class="mt-10">
	<h2 class="font-mont font-bold text-2xl text-black">Was wird dich erwarten?</h2>
	<p class="font-sans font-light text-xl text-black mt-3">
		Hier kannst du <a href="/blog">Blogbeiträge</a> unterschiedlichster Menschen lesen und neue Inspirationen für deine nächste Reise
		suchen. Es gibt so viel zu entdecken, wenn wir alle unsere Erfahrungen miteinander von und über die Welt teilen.
	</p>
</section>
