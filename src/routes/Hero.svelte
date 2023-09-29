<script lang="ts">
	import { Button } from 'flowbite-svelte';

	interface HandSettings {
		x1: number;
		x2: number;
		y1: number;
		y2: number;
		width: number;
		animation: string;
	}

	let hands: { [key: string]: HandSettings } = {
		hours: {
			x1: 50,
			x2: 40,
			y1: 50,
			y2: 35,
			width: 10,
			animation: 'animate-hours-hand'
		},
		minutes: {
			x1: 50,
			x2: 75,
			y1: 50,
			y2: 15,
			width: 5,
			animation: 'animate-minutes-hand'
		},
		seconds: {
			x1: 50,
			x2: 75,
			y1: 50,
			y2: 15,
			width: 1,
			animation: 'animate-seconds-hand'
		}
	};
</script>

<section
	class="bg-gradient-radial relative grid aspect-square place-items-center content-center gap-8 overflow-hidden from-primary-800 to-primary-900 to-70% p-4 landscape:to-60%"
>
	<h1
		class="z-10 text-center text-2xl font-semibold tracking-wider text-secondary-100 md:text-6xl lg:text-7xl"
	>
		Track your <span class="text-primary-500">time</span>,<br />to lose sense of it
	</h1>
	<p
		class="z-10 max-w-xs text-center text-sm font-extralight text-secondary-200 md:max-w-sm md:text-lg lg:text-xl"
	>
		The best dedicated app for the flowtime technique, the evolution of the pomodoro
	</p>
	<Button size="xl" href="/signup" class="z-50 bg-accent-500 transition-colors hover:bg-accent-600"
		>Sign Up For FREE</Button
	>
	{#each Object.values(hands) as hand}
		<svg
			width="100%"
			height="100%"
			class="{hand.animation} pointer-events-none absolute p-4 md:p-8 lg:p-12"
		>
			<line
				x1="{hand.x1}%"
				x2="{hand.x2}%"
				y1="{hand.y1}%"
				y2="{hand.y2}%"
				stroke-width={hand.width}
				stroke-linecap="round"
				class="stroke-primary-800"
			></line>
		</svg>
	{/each}
</section>
