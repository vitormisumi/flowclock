<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Tooltip } from 'flowbite-svelte';
	import { windowWidth } from '../stores';

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
		buttonStyle="menu"
		type="submit"
		class="w-full"
		on:click={() => (completedHidden = !completedHidden)}
	>
		<i class="fa-solid {completedHidden ? 'fa-check-circle' : 'fa-ban'}" />
	</Button>
</form>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800" trigger="hover">
		{completedHidden ? 'Show completed' : 'Hide completed'}
	</Tooltip>
{/if}
