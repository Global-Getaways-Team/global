<script lang="ts">
	import type { PageData } from "./$types";
	import type { Comment as CommentT } from "$lib/types/models";
	import type { Favorite } from "$lib/types/models";
	import guest from "../../../store";
	import Comment from "$lib/components/Comment.svelte";
	import Icon from "@iconify/svelte";
	export let data: PageData;

	let err: Error = Error("default");
	let showComment = false;
	const comment: CommentT = {
		blogId: data.blog.id,
		body: ""
	};

	function showTrashIcon(c: CommentT): boolean {
		if (c.authorId == $guest) return true;
		return false;
	}

	function getLength(str: string): number {
		if (str.trim().length == 0) {
			return 0;
		}

		return str.trim().split(" ").length;
	}

	function isValid(): boolean {
		const bodyLength = getLength(comment.body);

		if (!(bodyLength < 150 && bodyLength >= 1)) {
			err = Error("at least 100 words needed for the body.");
			return false;
		}

		return true;
	}

	async function deleteComment(c: CommentT, i: number) {
		await fetch(`http://localhost:8080/api/comment/delete/${c.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});

		data.comments.splice(i, 1);
		data.comments = data.comments;
	}

	async function create() {
		const isValidForm = isValid();

		if (!isValidForm) {
			return;
		}

		const res = await fetch("http://localhost:8080/api/comment/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(comment),
			credentials: "include"
		});

		const c = await res.json();

		if (res.status == 409) {
			if (c.error.code == "P2002") {
				err = Error(c.error.code);
				return;
			}
		}

		data.comments = [c, ...data.comments];
		showComment = !showComment;
		comment.body = "";
	}

	async function favoritise() {
		const fav: Favorite = {
			blogId: data.blog.id
		};

		const res = await fetch("http://localhost:8080/api/favorite/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(fav),
			credentials: "include"
		});

		const result: Favorite = await res.json();
		data.favorite = result;
	}

	async function defavoritise() {
		await fetch(`http://localhost:8080/api/favorite/delete/${data.favorite.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});
		data.favorite = null;
	}
</script>

<svelte:head>
	<title>{data.blog.title}</title>
	<meta
		name="description"
		content="Ein Blog ueber die Reise nach {data.blog.city} - {data.blog.country}"
	/>
</svelte:head>

<article>
	<div class="flex items-center">
		<h1 class="font-black text-4xl text-black inline">{data.blog.title}</h1>
		{#if data.favorite === null}
			<button on:click={favoritise}>
				<Icon
					style="color:red;"
					width="25"
					height="25"
					icon="material-symbols:favorite-outline"
					class="ml-5 cursor-pointer"
				/>
			</button>
		{:else}
			<button on:click={defavoritise}>
				<Icon
					style="color:red;"
					width="25"
					height="25"
					icon="material-symbols:favorite"
					class="ml-5 cursor-pointer"
				/>
			</button>
		{/if}
	</div>
	<div class="flex justify-between my-1">
		<span class="font-sans text-black text-lg">{data.blog.city} - {data.blog.country}</span>
		<span class="opacity-80">{data.blog.createdAt}</span>
	</div>
	<hr class="bg-black opacity-50" />
	<p class="mt-3 font-sans text-black text-md text-justify">{data.blog.body}</p>
</article>

<section class="mt-10">
	<div
		class="flex items-center cursor-pointer"
		on:click|preventDefault={() => (showComment = !showComment)}
		on:keydown|preventDefault={() => (showComment = !showComment)}
	>
		<Icon icon="ic:baseline-plus" />
		<span class="font-sans text-md text-black">Erstelle einen Kommentar</span>
	</div>
	{#if showComment}
		<div class="relative w-full">
			<input
				type="text"
				id="comment"
				placeholder="Die Reise meines Lebens..."
				bind:value={comment.body}
				class="border-b-2 border-solid my-4 border-black border-opacity-50 outline-none p-1 resize-none w-full"
			/>

			<span class="absolute top-5 right-3 font-sans text-black">{getLength(comment.body)}</span>
		</div>
		<button
			type="submit"
			class="bg-grey rounded-full w-32 font-mont p-1 font-extrabold mb-3"
			on:click={create}
		>
			Erstellen
		</button>
	{/if}
</section>

<section class="mt-10">
	<h2 class="font-black font-mont text-black text-2xl">Kommentare</h2>
	{#each data.comments as comment, index (comment.id)}
		<Comment
			{comment}
			showTrashIcon={showTrashIcon(comment)}
			on:click={() => {
				deleteComment(comment, index);
			}}
		/>
	{/each}
</section>
