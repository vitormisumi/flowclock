<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';
	import { selectedProject, selectedProjectId } from './stores';

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('id', String($selectedProject.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			$selectedProjectId = 0;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Delete project</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">
		Delete project {$selectedProject.name}?
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/delete"
		use:enhance={handleClick}
	>
		<Button buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button buttonStyle="red" type="submit" disabled={loading}>Delete</Button>
	</form>
</Modal>
