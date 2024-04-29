<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';

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
		<iconify-icon icon="{completedHidden ? 'ion:checkmark-circle' : 'ion:ban'}" />
	</Button>
</form>
{#if $canHover}
	<Tooltip placement="left">
		{completedHidden ? 'Show completed' : 'Hide completed'}
	</Tooltip>
{/if}
