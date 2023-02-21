<script lang="ts">
	import type { Comment } from "$lib/types/models";
	import Icon from "@iconify/svelte";
	export let comment: Comment;
	export let showTrashIcon = false;
</script>

<article class="flex flex-col mt-10">
	<div class="flex justify-between">
		<h3 class="text-black font-mont font-medium text-md">{comment.authorId}</h3>
		{#if showTrashIcon}
			<button on:click>
				<Icon icon="carbon:trash-can" />
			</button>
		{/if}
	</div>
	<p class="font-sans text-black font-extralight text-lg text-justify mt-1">{comment.body}</p>
</article>
