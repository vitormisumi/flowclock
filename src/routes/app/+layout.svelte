<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import UserMenu from './UserMenu.svelte';
	import Menu from './Menu.svelte';
	import Clock from './Clock.svelte';
	import Warning from './Warning.svelte';

	export let data;

	const sessions = writable();
	$: sessions.set(
		data.sessions?.map((x) =>
			Object.assign(x, {
				duration: Date.parse(x.end) - Date.parse(x.start)
			})
		)
	);

	const distractions = writable();
	$: distractions.set(data.distractions);

	const settings = writable();
	$: settings.set(data.settings);

	setContext('user', data.user);
	setContext('sessions', sessions);
	setContext('distractions', distractions);
	setContext('settings', settings);

	let menu = ['/app/account', '/app/settings'];
	$: background = menu.includes($page.url.pathname) ? '#0b0e0e' : '#051214';
</script>

<div
	class="absolute h-screen w-screen py-16 md:pb-24 lg:pl-24 landscape:pt-10 landscape:pl-16  landscape:lg:pl-24"
	style:background
>
	<slot />
</div>
<UserMenu />
<Menu />
<Clock />
<Warning />
