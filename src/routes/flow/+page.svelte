<script>
	import Clock from './Clock.svelte';
	import Task from './Task.svelte';
	import Buttons from './Buttons.svelte';
</script>

<div class="bg-gradient-radial from-primary-800 to-secondary-900 h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0">
	<Task />
	<Clock />
	<Buttons />
</div>
