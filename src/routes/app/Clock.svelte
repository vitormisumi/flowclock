<script lang="ts">
	import { onMount } from 'svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
    import { session } from './session/stores';

	let stopwatch: number = 0;

	onMount(() => {
		let start = Date.parse($session.start);
		const interval = setInterval(() => {
			if ($session.running) {
				stopwatch = Date.now() - start;
			} else {
				stopwatch = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock(stopwatch);
</script>

<div class="items-center text-secondary-100 rounded-lg w-full text-center py-4">
	<p class="text-md font-mono tracking-tight">
		{clock}
	</p>
</div>
