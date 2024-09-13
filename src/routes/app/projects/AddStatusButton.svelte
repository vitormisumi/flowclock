<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { selectedProject } from './stores';

	export let status: TaskStatus[];

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('project_id', String($selectedProject.id));
		formData.append('order', String(status.length + 1));
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
			class="flex h-full items-start gap-1 rounded-l-lg bg-secondary-50 p-2 dark:bg-secondary-900/80"
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
				class="h-8 w-20 rounded-md bg-transparent pl-1 focus:ring-0 dark:bg-transparent dark:text-secondary-300 focus:dark:border-secondary-700"
			/>
			<div class="flex justify-end gap-1">
				<Button size="xs" buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}
					>Cancel</Button
				>
				<Button
					size="xs"
					buttonStyle="accent"
					type="submit"
					class="place-self-end self-end"
					disabled={loading}
				>
					Save
				</Button>
			</div>
		</form>
	{:else}
		<Button
			size="xs"
			buttonStyle="add"
			class="flex h-full w-full items-center gap-2 rounded-r-none"
			on:click={() => (open = true)}
		>
			<iconify-icon icon="ion:add" />add status
		</Button>
	{/if}
</div>
