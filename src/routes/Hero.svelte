<script lang="ts">
	import { Image } from '@unpic/svelte';
	import foreground from '$lib/assets/foreground.png';
	import stars from '$lib/assets/stars.jpg';
</script>

<div class="absolute top-0 left-0 -z-10 overflow-hidden h-screen">
	<Image src={stars} alt="Sky" layout="fullWidth" class="animate-spin-slow opacity-20" />
</div>
<section
	class="pointer-events-none absolute top-0 grid h-screen w-full place-items-center content-center gap-8 p-4"
>
	<Image src={foreground} alt="Sky" layout="fullWidth" class="absolute bottom-0 left-0" />
	<h1
		class="z-10 text-center text-5xl font-semibold tracking-wider text-secondary-100 md:text-6xl lg:text-7xl"
	>
		Your <span class="text-primary-500">time</span>,<br />your
		<span class="text-accent-500">way</span>
	</h1>
	<p class="z-10 max-w-sm text-center font-extralight text-secondary-200 md:text-lg">
		The first dedicated app for the flowtime technique, the evolution of the pomodoro
	</p>
</section>
