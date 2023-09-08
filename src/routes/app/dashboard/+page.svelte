<script lang="ts">
	import { fade } from 'svelte/transition';
	import Duration from './Duration.svelte';
	import Sessions from './Sessions.svelte';
	import { session, sessionBreak } from '../session/stores';
	import { navigating } from '$app/stores';
</script>

<div
	class="m-4 md:m-8 lg:m-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session' &&
	($session.running || ($sessionBreak.running && !$sessionBreak.alarmPlayed))
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<Sessions />
	<Duration />
</div>
