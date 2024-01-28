<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { windowWidth } from './stores';
	import Button from '$lib/components/Button.svelte';
	import DeleteGroupButton from './DeleteGroupButton.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let group: ProjectGroup;

	let edit: number;

	let showDelete: number;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(group.id));
		loading = true;
		group.name = formData.get('name')?.toString() || '';
		edit = 0;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div
	class="flex h-8 w-full justify-between"
	on:mouseenter={() => {
		if (!edit) {
			showDelete = group.id;
		}
	}}
	on:mouseleave={() => (showDelete = 0)}
	role="group"
>
	{#if edit === group.id}
		<form
			class="flex h-8 w-full gap-1"
			method="POST"
			action="?/editGroup"
			use:enhance={handleClick}
		>
			<input
				type="text"
				name="name"
				placeholder={group.name}
				class="w-full rounded-md bg-transparent pl-2 text-secondary-700 focus:ring-0 dark:bg-transparent dark:text-secondary-300 focus:dark:border-primary-700"
			/>
			<Button size="xs" on:click={() => (edit = 0)}>Cancel</Button>
			<Button size="xs" buttonStyle="accent" type="submit" disabled={loading}>Save</Button>
		</form>
	{:else}
		<Button
			class="cursor-text bg-transparent pl-2 transition-colors hover:bg-transparent focus:ring-0 dark:bg-transparent"
			on:click={() => {
				edit = group.id;
				showDelete = 0;
			}}
			on:keypress={() => {
				edit = group.id;
				showDelete = 0;
			}}
		>
			<h3 class="whitespace-nowrap font-bold text-secondary-600 dark:text-secondary-300">
				{group.name}
			</h3>
		</Button>
		{#if $windowWidth >= 768}
			<Tooltip placement="right">Rename group</Tooltip>
		{/if}
	{/if}
	{#if showDelete === group.id || $windowWidth <= 1024}
		<div in:fade>
			<DeleteGroupButton {group} />
		</div>
	{/if}
</div>
