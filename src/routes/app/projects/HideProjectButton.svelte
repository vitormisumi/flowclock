<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { windowWidth } from './stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let hidden: boolean;
	export let open: boolean;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('hidden', String(hidden));
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<form method="POST" action="?/hideProjectCard" use:enhance={handleClick}>
	<Button
		size="xs"
		class="bg-transparent transition-colors hover:bg-primary-700"
		type="submit"
		on:click={() => (hidden = !hidden)}
	>
		<i class="fa-solid {hidden ? 'fa-eye' : 'fa-eye-slash'}" />
	</Button>
</form>
{#if $windowWidth >= 768}
	<Tooltip placement="left" trigger="hover">{hidden ? 'Show card' : 'Hide card'}</Tooltip>
{/if}
