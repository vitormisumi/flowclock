<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<section
	class="relative grid h-screen place-items-center content-center gap-8 overflow-hidden bg-secondary-900 p-4"
>
	<h1
		class="z-10 text-center text-2xl font-semibold tracking-wider text-secondary-100 md:text-6xl lg:text-7xl"
	>
		Claim back your <span class="text-primary-500">time</span>.
	</h1>
	<p
		class="z-10 max-w-xs text-center text-sm font-light text-secondary-200 md:max-w-sm md:text-lg lg:text-xl"
	>
		The best dedicated app for the flowtime technique, the evolution of the pomodoro
	</p>
	<Button size="xl" href="/signup" class="bg-accent-500 transition-colors hover:bg-accent-600">
		Sign Up For FREE
	</Button>
	<i class="fa-solid fa-chevron-down animate-bounce absolute bottom-1 text-xl text-white" />
</section>
