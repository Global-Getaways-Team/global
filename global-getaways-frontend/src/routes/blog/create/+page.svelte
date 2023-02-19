<script lang="ts">
	import type { Blog } from "$lib/types/models";
	let blog: Blog = {
		body: "",
		country: "",
		city: "",
		image: "",
		title: ""
	};

	let err: Error = Error("");

	function getLength(str: string): number {
		if (str.trim().length == 0) {
			return 0;
		}

		return str.trim().split(" ").length;
	}

	function isValid(): boolean {
		const bodyLength = getLength(blog.body);
		const titleLength = getLength(blog.title);
		const cityLength = getLength(blog.city);
		const countryLength = getLength(blog.country);

		if (!(titleLength < 10 && titleLength >= 1)) {
			err = Error("title has to be between 1 and 10 words");
			return false;
		}

		if (cityLength == 0) {
			err = Error("only one city possible");
			return false;
		}

		if (countryLength == 0) {
			err = Error("only one country possible");
			return false;
		}

		if (blog.image == "") {
			err = Error("image has to be provided");
			return false;
		}

		if (!(bodyLength < 500 && bodyLength >= 100)) {
			err = Error("at least 100 words needed for the body.");
			return false;
		}

		return true;
	}

	async function create() {
		err = Error();
		try {
			isValid();
		} catch (e) {
			return e;
		}

		const res = await fetch("http://localhost:8080/api/blog/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(blog),
			credentials: "include"
		});

		const data = await res.json();

		if (res.status == 409) {
			if (data.error.code == "P2002") {
				err = Error(data.error.code);
				return;
			}
		}
	}
</script>

{#if err.message != ""}
	<section class="my-2  bg-red text-black p-2 rounded-lg ">
		<h3>{err.message}</h3>
	</section>
{/if}

<form class="flex flex-col">
	<input
		type="text"
		id="text"
		placeholder="Titel"
		class="outline-none font-sans mt-4 text-xl"
		minlength="1"
		bind:value={blog.title}
	/>

	<input
		type="text"
		id="text"
		placeholder="Berlin"
		class="outline-none font-sans mt-4 text-xl"
		bind:value={blog.city}
	/>

	<input
		type="text"
		id="text"
		placeholder="Deutschland"
		class="outline-none font-sans mt-4 text-xl"
		bind:value={blog.country}
	/>

	<input
		type="url"
		id="image"
		placeholder="www.unsplash.com/some/picture"
		class="outline-none font-sans mt-4 text-xl"
		bind:value={blog.image}
	/>

	<div class="relative w-full">
		<textarea
			name="comment"
			id="comment"
			placeholder="Die Reise meines Lebens..."
			cols="30"
			rows="10"
			bind:value={blog.body}
			class="border-black border-solid border-[1px] my-4 outline-none p-5 resize-none w-full"
			minlength="500"
			maxlength="2000"
		/>

		<span class="absolute top-5 right-3 font-sans text-black">{getLength(blog.body)}</span>
	</div>

	<button
		type="submit"
		class="bg-grey rounded-full w-32 font-mont p-1 font-extrabold mb-3"
		on:click={create}
	>
		Erstellen
	</button>
</form>
