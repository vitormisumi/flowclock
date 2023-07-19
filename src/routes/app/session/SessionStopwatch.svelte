<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionBreak, sessionStart, sessionEnd } from './stores';
	import { ratio } from '../settings/stores';

	let clock: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session) {
				clock = Date.now() - $sessionStart;
			} else if ($sessionBreak) {
				clock = Date.now() - $sessionEnd;
			} else {
				clock = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: seconds = Math.floor((clock / 1000) % 60);
	$: minutes = Math.floor((clock / 60000) % 60);
	$: hours = Math.floor(clock / 3600000);
</script>

<div class="grid justify-items-center text-white drop-shadow-xl shadow-orange-500">
	{#key clock}
		<p class="text-6xl md:text-9xl">
			<span>{hours > 9 ? hours : '0' + hours}</span>:<span
				>{minutes > 9 ? minutes : '0' + minutes}</span
			>:<span>{seconds > 9 ? seconds : '0' + seconds}</span>
		</p>
	{/key}
	<p class="text-sm md:text-md text-secondary-100">
		You have earned {Math.floor(minutes / $ratio)}
		{Math.floor(minutes / $ratio) > 1 ? 'minutes' : 'minute'} of break
	</p>
</div>
