<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { session } from '../session/stores';
</script>

<div
	class="m-4 md:m-8 lg:m-12"
	in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<p class="flex justify-center text-secondary-50">Projects</p>
</div>
