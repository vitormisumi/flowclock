<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import hero from '$lib/assets/hero.jpeg';
	import { Image } from '@unpic/svelte';
</script>

<section
	class="relative grid h-[90vh] place-items-center content-center gap-8 overflow-hidden bg-secondary-800 p-4"
>
	<h1
		class="z-10 text-center text-2xl font-semibold tracking-wider text-secondary-100 md:text-6xl lg:text-7xl"
	>
		Sync up with your <span class="text-primary-400">flow</span>.
	</h1>
	<p
		class="z-10 max-w-xs text-center text-sm font-light text-secondary-200 md:max-w-sm md:text-lg lg:text-xl"
	>
		The best dedicated app for the flowtime technique, the evolution of the pomodoro.
	</p>
	<Button size="xl" href="/signup" buttonStyle="accent" class="z-10">Sign Up For FREE</Button>
	<i class="fa-solid fa-chevron-down absolute bottom-1 z-10 animate-bounce text-xl text-white" />
	<Image
		src={hero}
		layout="fullWidth"
		breakpoints={[300, 600, 900, 1200, 1500, 1800]}
		alt="Student in flow state"
		class="absolute h-full w-full object-cover object-top mix-blend-multiply"
	/>
</section>
