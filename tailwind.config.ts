import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"background": "#fbfbfe",
				"background-dark": "#010104",
				"accent": "#443dff",
				"accent-dark": "#0600c2",
				"text": "#040316",
				"text-dark": "#ebe9fc",
				"primary": "#2f27ce",
				"primary-dark": "#3a31d8",
				"secondary": "#dedcff",
				"secondary-dark": "#020024"

			},
			screens: {
				'sm': '450px',
			}
		},
	},
	plugins: [],
};

export default config;
