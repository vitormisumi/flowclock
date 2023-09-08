<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { page } from '$app/stores';
	import Avatar from './Avatar.svelte';
	import Menu from './Menu.svelte';
	import Clock from './Clock.svelte';

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

	let menu = ['/app/account', '/app/settings'];
	$: background = menu.includes($page.url.pathname) ? '#0b0e0e' : '#051214';
</script>

<div
	class="absolute h-screen w-screen py-16 md:py-24 lg:pl-24 landscape:pb-0 lg:landscape:py-24"
	style:background
>
	<slot />
</div>
<Avatar />
<Menu />
<Clock />
