<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';

	export let task: Task;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('id', String(task.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button
	size="xs"
	buttonStyle="menu"
	class="text-red-700 dark:text-red-700"
	on:click={() => (open = true)}
>
	<iconify-icon icon="ion:trash" class="text-red-700 dark:text-red-700" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Delete task</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<iconify-icon icon="ion:warning" class="text-3xl text-red-700 dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">Delete task {task.name}?</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteTask"
		use:enhance={handleClick}
	>
		<Button buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button buttonStyle="red" type="submit" disabled={loading}>Delete</Button>
	</form>
</Modal>
