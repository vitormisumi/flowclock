<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext, onMount } from 'svelte';
	import { milliseconds, session, sessionBreak } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	$: minutes = Math.floor($milliseconds / 60000 / $settings.ratio);

	let message: string =
		'You currently have no sessions running. Click the button below to start a new one.';

	$: if ($session.running) {
		message =
			'You have earned ' + minutes + (minutes === 1 ? ' minute ' : ' minutes ') + 'of break';
	} else if ($sessionBreak.running) {
		message = $sessionBreak.alarmPlayed ? 'Time for your next session!' : 'Enjoy your break!';
	} else {
		message = 'You currently have no sessions running. Click the button below to start a new one.';
	}
</script>

<p class="h-20 landscape:h-auto">{message}</p>
