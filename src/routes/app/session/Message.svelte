<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { milliseconds, session, sessionBreak, sessionInterruptions } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	$: minutes = Math.floor($milliseconds / 60000 / $settings.ratio);

	let message: string;

	$: if ($session.running) {
		message = 'Break time: ' + minutes + ' min';
	} else if ($sessionBreak.running) {
		message = $sessionBreak.alarmPlayed ? 'Time for your next session!' : $settings.break_message;
	} else {
		message = '';
	}
</script>

<div class="grid w-full items-center justify-center">
	<p
		class="text-primary-50"
		style:color={$sessionBreak.running && !$sessionBreak.alarmPlayed ? '#e35403' : '#ebf7fa'}
	>
		{message}
	</p>
	<p>id:{$session.id}</p>
	<p>running:{$session.running}</p>
	<p>start:{$session.start}</p>
	<p>end:{$session.end}</p>
	<!-- <p>warning:{$session.warning}</p>
	<p>pause:{$session.pause}</p>
	<p>break:{$sessionBreak.running}</p> -->
	<p>duration:{$sessionBreak.duration}</p>
</div>
