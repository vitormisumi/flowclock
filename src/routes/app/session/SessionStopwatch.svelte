<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionBreak } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import type { Session } from './types';

	const settings: Writable<Settings> = getContext('settings');
	const lastSession: Writable<Session> = getContext('lastSession');
	const currentSession: Writable<Session> = getContext('currentSession');

	let clock = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session) {
				clock = Date.now() - Date.parse($currentSession.started_at);
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
		You have earned {Math.floor(minutes / $settings.ratio)}
		{Math.floor(minutes / $settings.ratio) > 1 ? 'minutes' : 'minute'} of break
	</p>
</div>
