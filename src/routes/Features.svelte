<script lang="ts">
	import { Button } from 'flowbite-svelte';
    import features1 from '$lib/assets/features1.gif';
</script>

<section
	class="grid gap-8 bg-secondary-100 px-4 py-20 text-secondary-900 sm:grid-cols-2 sm:px-8 md:px-12 lg:px-20"
>
	<div class="h-96 border border-primary-500 rounded-xl overflow-hidden drop-shadow-xl">
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
	<div class="row-start-4 grid content-center gap-4 sm:row-start-auto sm:justify-items-end">
		<h2 class="text-3xl font-bold">Organize your projects</h2>
		<p class="font-extralight">Combine your sessions with your tasks and to-dos</p>
		<Button href="/signup" class="w-fit bg-accent-500 transition-colors hover:bg-accent-600">
			Get Started
		</Button>
	</div>
	<div class="h-96 border border-white">
		<p class="">GIF</p>
	</div>
</section>
