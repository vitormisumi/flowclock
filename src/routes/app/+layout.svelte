<script lang="ts">
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import Avatar from './Avatar.svelte';
	import { writable } from 'svelte/store';
	import { millisecondsToClock } from '$lib/functions/functions';

	export let data;

	const settings = writable();
	$: settings.set(data.settings);

	const sessions = writable();
	$: sessions.set(data.sessions?.map((x) => Object.assign(x, {duration: millisecondsToClock(Date.parse(x.ended_at) - Date.parse(x.started_at))})));

	setContext('user', data.user);
	setContext('settings', settings);
	setContext('sessions', sessions);
</script>

<slot />
<Avatar />
<Menu />
