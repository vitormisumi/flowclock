<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionStart } from './stores';

	let sessionTime: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session) {
				sessionTime = Date.now() - $sessionStart;
			} else {
				sessionTime = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: seconds = Math.floor((sessionTime / 1000) % 60);
	$: minutes = Math.floor(sessionTime / 1000 / 60);
	$: hours = Math.floor(sessionTime / 1000 / 60 / 60);
</script>

<div class="grid justify-items-center text-white drop-shadow-xl shadow-orange-500">
	{#key sessionTime}
		<p class="text-6xl sm:text-9xl">
			<span>{hours > 9 ? hours : '0' + hours}</span>:<span
				>{minutes > 9 ? minutes : '0' + minutes}</span
			>:<span>{seconds > 9 ? seconds : '0' + seconds}</span>
		</p>
	{/key}
	<p class="text-xs text-secondary-100">You've already earned 8 minutes of break</p>
</div>
