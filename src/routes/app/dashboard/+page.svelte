<script lang="ts">
	import { fade } from 'svelte/transition';
	import Duration from './Duration.svelte';
	import Sessions from './Sessions.svelte';
    import { session } from '../session/stores';
    import { navigating } from '$app/stores';
</script>

<div
	class="h-screen grid p-4 sm:p-6 md:p-8 lg:p-12 lg:ml-24 content-evenly mb-20 sm:mb-24 lg:mb-0 bg-primary-900 overflow-scroll"
    in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session' ? { duration: 500, delay: 500 } : { duration: 0 }}
>
	<Sessions />
	<Duration />
</div>
