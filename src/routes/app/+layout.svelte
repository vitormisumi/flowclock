<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import Avatar from './Avatar.svelte';
	import { writable } from 'svelte/store';
	import { millisecondsToClock } from '$lib/functions/functions';
	import SessionStopwatch from './SessionStopwatch.svelte';
	import { sessionBreak, session } from './session/stores';

	export let data;

	const settings = writable();
	$: settings.set(data.settings);

	const sessions = writable();
	$: sessions.set(
		data.sessions?.map((x) =>
			Object.assign(x, {
				duration: millisecondsToClock(Date.parse(x.ended_at) - Date.parse(x.started_at))
			})
		)
	);

	setContext('user', data.user);
	setContext('settings', settings);
	setContext('sessions', sessions);

	let audio: HTMLAudioElement;

	onMount(() => {
		const interval = setInterval(() => {
			if ($sessionBreak.running && !$sessionBreak.alarmPlayed) {
				if (Date.now() - $session.end > $sessionBreak.duration) {
					audio.play();
					$sessionBreak.alarmPlayed = true;
				}
			}
		}, 1000)

		return () => clearInterval(interval);
	})
</script>

<slot />
<Avatar />
<Menu />
<SessionStopwatch />
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio} />
