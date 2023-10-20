<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { selectedProject } from './stores';
    import { getContext } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
    import type { Writable } from 'svelte/store';

    const status: Writable<TaskStatuses[]> = getContext('status');

	let addStatus = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('project_id', String($selectedProject.id));
		formData.append('order', String($status.length + 1));
		return async ({ update }) => {
			addStatus = false;
			loading = false;
			update();
		};
	};
</script>

<div>
	{#if addStatus}
		<form
			class="grid h-full rounded-lg bg-primary-900"
			action="?/addStatus"
			method="POST"
			use:enhance={handleClick}
		>
			<input
				name="status"
				type="text"
				class="border-none bg-transparent text-primary-50 focus:ring-0"
			/>
			<Button type="submit" class="place-self-end self-end bg-accent-500 ring-0" disabled={loading}>
				Save
			</Button>
		</form>
	{:else}
		<Button
			size="xs"
			class="h-full w-full rounded-r-none bg-transparent text-secondary-400 transition-colors hover:bg-primary-900 hover:bg-opacity-50"
			on:click={() => (addStatus = true)}
		>
			<i class="fa-solid fa-plus pr-2" />add status
		</Button>
	{/if}
</div>
