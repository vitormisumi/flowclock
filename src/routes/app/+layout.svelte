<script context="module">
	import Device from 'svelte-device-info';
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Menu from './Menu.svelte';
	import Screen from './Screen.svelte';
	import Warning from './Warning.svelte';
	import { canHover } from './stores';

	export let data;

	onMount(() => {
		data.settings?.dark_mode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
		$canHover = Device.canHover;
	});
</script>

<Screen>
	<span slot="main">
		<slot />
	</span>
	<span slot="menu">
		{#if data.user && data.sessions}
			<Menu user={data.user} sessions={data.sessions} />
		{/if}
	</span>
</Screen>
{#if data.settings}
	<Warning settings={data.settings} />
{/if}
