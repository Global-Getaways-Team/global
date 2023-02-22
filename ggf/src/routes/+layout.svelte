<script>
	// Components
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	// Styling
	import "../app.css";
</script>

<div class="flex flex-col mt-auto">
	<Header />
	<main class="w-[80%] min-h-[100vh] mx-auto">
		<slot />
	</main>
	<Footer />
</div>
