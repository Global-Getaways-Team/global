<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { Link } from "$lib/types/models";

	const links: Link[] = [
		{
			href: "https://twitter.com",
			icon: "mdi:twitter",
			text: "Twitter"
		},
		{
			href: "https://github.com",
			icon: "mdi:github",
			text: "GitHub"
		}
	];
</script>

<footer class="footer mt-20 flex justify-center border-t-[1px] border-solid border-black pt-10">
	<div class="flex flex-wrap gap-4 mb-10">
		{#each links as link}
			<a href={link.href}>
				<Icon class="inline-block" icon={link.icon} />
				<span class="font-sans">{link.text}</span>
			</a>
		{/each}
	</div>
</footer>
