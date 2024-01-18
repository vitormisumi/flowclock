<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import features1 from '$lib/assets/features1.gif';
</script>

<section
	class="grid gap-4 bg-secondary-100 px-4 py-20 text-secondary-900 sm:gap-8 sm:px-8 md:grid-cols-2 md:gap-12 md:px-12 lg:gap-20 lg:px-20"
>
	<div class="overflow-hidden rounded-xl border border-primary-500 drop-shadow-xl">
		<img src={features1} alt="FlowClock logo" class="w-full" />
	</div>
	<div class="grid content-center gap-4">
		<h2 class="text-3xl font-bold">Track all your sessions</h2>
		<p class="font-extralight">
			Register your time focused and automatically calculate your break duration
		</p>
		<Button href="/signup" class="w-fit bg-accent-500 transition-colors hover:bg-accent-600">
			Get Started
		</Button>
	</div>
	<div class="row-start-4 grid content-center gap-4 md:row-start-auto md:justify-items-end">
		<h2 class="text-3xl font-bold">Organize your projects</h2>
		<p class="font-extralight">Combine your sessions with your tasks and to-dos</p>
		<Button href="/signup" class="w-fit bg-accent-500 transition-colors hover:bg-accent-600">
			Get Started
		</Button>
	</div>
	<div class="overflow-hidden rounded-xl border border-primary-500 drop-shadow-xl">
		<!-- <img src={features1} alt="FlowClock logo" class="w-full" /> -->
	</div>
</section>
