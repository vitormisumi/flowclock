<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';

	export let s: TaskStatuses;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(s.id));
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" class="z-10" disabled={loading} on:click={() => (open = true)}>
	<iconify-icon icon="ion:trash" class="text-red-700 dark:text-red-700" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Delete status</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<iconify-icon icon="ion:warning" class="text-3xl text-red-700 dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">
		Delete status {s.status}? <br /><span class="font-bold">
			This will delete all tasks inside this status!
		</span>
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteStatus"
		use:enhance={handleClick}
	>
		<Button buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button
			buttonStyle="red"
			type="submit"
			disabled={loading}
		>
			Delete
		</Button>
	</form>
</Modal>
