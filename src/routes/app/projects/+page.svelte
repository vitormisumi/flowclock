<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<p class="flex justify-center text-secondary-50">Projects</p>
</div>
