<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import DeleteStatusButton from './DeleteStatusButton.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let status: TaskStatuses;

	let innerWidth: number;

	let edit: number;

	let showDelete: number;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(status.id));
		loading = true;
		status.status = formData.get('status')?.toString() || '';
		edit = 0;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<svelte:window bind:innerWidth />
<div
	class="flex w-full justify-between"
	on:mouseenter={() => {
		if (!edit) {
			showDelete = status.id;
		}
	}}
	on:mouseleave={() => (showDelete = 0)}
	role="status"
>
	{#if edit === status.id}
		<form class="flex h-8 gap-1" method="POST" action="?/editStatus" use:enhance={handleClick}>
			<input
				type="text"
				name="status"
				placeholder={status.status}
				class="w-full rounded-md bg-transparent pl-1 text-secondary-300 focus:border-primary-700 focus:ring-0"
			/>
			<Button size="xs" on:click={() => (edit = 0)}>Cancel</Button>
			<Button
				type="submit"
				size="xs"
				class="bg-accent-500 transition-colors hover:bg-accent-600"
				disabled={loading}
			>
				Save
			</Button>
		</form>
	{:else}
		<Button
			class="cursor-text bg-transparent p-1 transition-colors hover:bg-transparent focus:ring-0"
			on:click={() => {
				edit = status.id;
				showDelete = 0;
			}}
			on:keypress={() => {
				edit = status.id;
				showDelete = 0;
			}}
		>
			<h3 class="whitespace-nowrap font-bold text-secondary-300">
				{status.status}
			</h3>
		</Button>
		<Tooltip placement="right">Rename status</Tooltip>
	{/if}
	{#if showDelete === status.id || (innerWidth <= 1024 && !edit)}
		<div in:fade>
			<DeleteStatusButton {status} />
		</div>
	{/if}
</div>
