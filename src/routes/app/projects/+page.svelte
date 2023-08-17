<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { session } from '../session/stores';
</script>

<div
	class="h-screen grid p-4 sm:p-6 md:p-8 lg:p-12 lg:ml-24 content-evenly mb-20 sm:mb-24 lg:mb-0 bg-primary-900 overflow-scroll"
	in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<p class="flex justify-center text-secondary-50">Projects</p>
</div>
