<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { windowWidth } from './stores';
	import DeleteStatusButton from './DeleteStatusButton.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let s: TaskStatuses;

	let edit: number;

	let showDelete: number;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(s.id));
		loading = true;
		s.status = formData.get('s')?.toString() || '';
		edit = 0;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div
	class="flex w-full justify-between"
	on:mouseenter={() => {
		if (!edit) {
			showDelete = s.id;
		}
	}}
	on:mouseleave={() => (showDelete = 0)}
	role="status"
>
	{#if edit === s.id}
		<form class="flex h-8 gap-1 justify-between w-full" method="POST" action="?/editStatus" use:enhance={handleClick}>
			<input
				type="text"
				name="s"
				placeholder={s.status}
				class="w-full rounded-md bg-transparent pl-1 text-secondary-300 focus:border-primary-700 focus:ring-0"
			/>
			<div class="flex gap-1">

				<Button size="xs" on:click={() => (edit = 0)}>Cancel</Button>
				<Button
				type="submit"
				size="xs"
				class="bg-accent-500 transition-colors hover:bg-accent-600"
				disabled={loading}
				>
				Save
			</Button>
		</div>
		</form>
	{:else}
		<Button
			class="cursor-text bg-transparent p-1 transition-colors hover:bg-transparent focus:ring-0"
			on:click={() => {
				edit = s.id;
				showDelete = 0;
			}}
			on:keypress={() => {
				edit = s.id;
				showDelete = 0;
			}}
		>
			<h3 class="whitespace-nowrap font-bold text-secondary-300 border-2 border-transparent">
				{s.status}
			</h3>
		</Button>
		<Tooltip placement="right">Rename status</Tooltip>
	{/if}
	{#if showDelete === s.id || ($windowWidth <= 1024 && !edit)}
		<div in:fade>
			<DeleteStatusButton {s} />
		</div>
	{/if}
</div>
