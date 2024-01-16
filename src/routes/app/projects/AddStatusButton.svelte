<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { selectedProject } from './stores';
	import { afterUpdate, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('project_id', String($selectedProject.id));
		formData.append('order', String($status.length + 1));
		return async ({ update }) => {
			open = false;
			loading = false;
			update();
		};
	};

	let formElement: HTMLFormElement;

	function scrollToForm() {
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });
		}
	}

	afterUpdate(scrollToForm);
</script>

<div>
	{#if open}
		<form
			class="flex h-full items-start gap-1 rounded-l-lg bg-primary-900/80 p-2"
			action="?/addStatus"
			method="POST"
			use:enhance={handleClick}
			bind:this={formElement}
			transition:fade
		>
			<input
				name="status"
				type="text"
				placeholder="Status"
				class="h-8 w-20 rounded-md bg-transparent pl-1 text-secondary-300 focus:border-primary-700 focus:ring-0"
			/>
			<div class="flex justify-end gap-1">
				<Button size="xs" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
				<Button
					type="submit"
					size="xs"
					class="place-self-end self-end bg-accent-500 ring-0"
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</form>
	{:else}
		<Button
			size="xs"
			class="h-full w-full rounded-r-none bg-transparent text-secondary-400 transition-colors hover:bg-primary-900/50 hover:text-secondary-200"
			on:click={() => (open = true)}
		>
			<i class="fa-solid fa-plus pr-2" />add status
		</Button>
	{/if}
</div>
