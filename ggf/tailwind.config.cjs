/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			accent: "#FFFFFF",
			black: "#252422",
			green: "#4BB543",
			grey: "#F7F7F7",
			red: "#FF5252",
		},
		fontFamily: {
			sans: ["Work Sans", "sans-serif"],
			mont: ["Montserrat", "sans-serif"]
		},
		extend: {}
	},
	plugins: []
};
