/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: { 50: '#ebf7fa', 100: '#c2e7ef', 200: '#9ad8e4', 300: '#72c8da', 400: '#49b8cf', 500: '#309fb6', 600: '#257b8d', 700: '#1b5865', 800: '#10353d', 900: '#051214' },
				secondary: { 50: '#f1f3f4', 100: '#d5dbdd', 200: '#b9c3c6', 300: '#9dacaf', 400: '#819498', 500: '#677a7e', 600: '#505f62', 700: '#394446', 800: '#22292a', 900: '#0b0e0e' },
				accent: { 50: '#ffefe6', 100: '#fecfb3', 200: '#fdae81', 300: '#fdae81', 400: '#fc6e1c', 500: '#e35403', 600: '#b04202', 700: '#7e2f02', 800: '#4c1c01', 900: '#190900' },
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},

	plugins: [
		require('flowbite/plugin')
	],

	darkMode: 'class',

};

module.exports = config;
