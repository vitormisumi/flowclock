<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { session, sessionBreak } from '../session/stores';
</script>

<div
	class="m-4 md:m-8 lg:m-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session' &&
	($session.running || ($sessionBreak.running && !$sessionBreak.alarmPlayed))
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<p class="flex justify-center text-secondary-50">Projects</p>
</div>
