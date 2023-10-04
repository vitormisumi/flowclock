<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../types';
	import { getContext } from 'svelte';
	import { milliseconds, session, sessionBreak } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	$: minutes = Math.floor($milliseconds / 60000 / $settings.ratio);

	let message: string;

	$: if ($session.running) {
		message = 'Break time: ' + minutes + ' min';
	} else if ($sessionBreak.running) {
		message = $sessionBreak.alarmPlayed ? 'Time for your next session!' : 'Enjoy your break!';
	} else {
		message = '';
	}
</script>

<div class="flex w-full items-center justify-center">
	<p
		class="text-primary-50"
		style:color={$sessionBreak.running && !$sessionBreak.alarmPlayed ? '#e35403' : '#ebf7fa'}
	>
		{message}
	</p>
</div>
