<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { windowWidth } from './stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let completedHidden: boolean;
	export let open: boolean;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('hidden', String(completedHidden));
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<form method="POST" action="?/hideCompletedToDos" use:enhance={handleClick}>
	<Button
		size="xs"
		class="bg-transparent transition-colors hover:bg-primary-700"
		type="submit"
		on:click={() => (completedHidden = !completedHidden)}
	>
		<i class="fa-solid {completedHidden ? 'fa-check-circle' : 'fa-ban'}" />
	</Button>
</form>
{#if $windowWidth >= 768}
	<Tooltip placement="left" trigger="hover"
		>{completedHidden ? 'Show completed' : 'Hide completed'}</Tooltip
	>
{/if}
