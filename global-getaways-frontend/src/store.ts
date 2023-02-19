import { writable } from "svelte/store";
import { browser } from "$app/environment";

const guest = writable((browser && localStorage.getItem("global_getaways_guest_id")) || "default");

guest.subscribe((val) => {
	browser && localStorage.setItem("global_getaways_guest_id", val);
});

export default guest;
