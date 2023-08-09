<script lang="ts">
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import Avatar from './Avatar.svelte';
	import { writable } from 'svelte/store';

	export let data;

	const settings = writable();
	$: settings.set(data.settings);

	setContext('user', data.user);
	setContext('settings', settings);
</script>

<slot />
<Avatar />
<Menu />
