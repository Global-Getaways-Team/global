<script lang="ts">
	import MiniCard from "$lib/components/MiniCard.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Global Getaways</title>
	<meta name="description" content="Homepage der Global Getaways" />
</svelte:head>

<h2 class="font-mont text-black text-2xl font-black">Diese Beiträge scheinen dir zu gefallen</h2>
<section class="flex gap-3 mt-4">
	{#each data.blogs as blog}
		<MiniCard {blog} />
	{/each}
</section>

<h2 class="font-mont font-bold text-2xl text-black mt-10">
	Melde dich direkt hier an, um nichts mehr zu verpassen!
</h2>
<form class="mt-5 flex items-center">
	<input
		type="email"
		id="email"
		placeholder="muster@mail.de"
		class="outline-none border-b-[1px] border-black"
	/>
	<button type="submit" class="ml-2 font-sans font-medium bg-silver rounded-full px-2 py-1">
		Subscribe
	</button>
</form>
