<script>
    import { Button } from 'flowbite-svelte';
	import Clock from './Clock.svelte';
	import Task from './Task.svelte';
</script>

<div class="bg-gradient-radial from-primary-800 to-secondary-900 h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0">
	<Task />
	<Clock />
	<div class="grid justify-items-center gap-4">
		<Button class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 text-3xl shadow-lg w-48 h-16">Break</Button>
		<Button size="xs" class="bg-secondary-100 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 shadow-md">Distraction</Button>
	</div>
</div>
