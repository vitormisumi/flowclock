<script lang="ts">
    import { onMount } from 'svelte';
	import { sessionEnd } from './stores';

    let timer: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			timer = Date.now() - $sessionEnd; 
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutes = Math.floor(timer / 1000 / 60);
</script>

<h1 class="text-center text-6xl sm:text-8xl text-white">Enjoy your break!</h1>
<p class="text-center text-secondary-50">
	You still have {minutes} minutes left
</p>
