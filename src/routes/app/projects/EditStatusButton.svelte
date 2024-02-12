<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Tooltip } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { windowWidth } from '../stores';
	import DeleteStatusButton from './DeleteStatusButton.svelte';

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
		<form
			class="flex h-8 w-full justify-between gap-1"
			method="POST"
			action="?/editStatus"
			use:enhance={handleClick}
		>
			<input
				type="text"
				name="s"
				placeholder={s.status}
				class="w-full rounded-md bg-transparent pl-1 text-secondary-300 focus:border-primary-700 focus:ring-0"
			/>
			<div class="flex gap-1">
				<Button size="xs" buttonStyle="cancel" on:click={() => (edit = 0)}>Cancel</Button>
				<Button size="xs" buttonStyle="accent" type="submit" disabled={loading}>Save</Button>
			</div>
		</form>
	{:else}
		<Button
			buttonStyle="add"
			class="cursor-text p-1"
			on:click={() => {
				edit = s.id;
				showDelete = 0;
			}}
			on:keypress={() => {
				edit = s.id;
				showDelete = 0;
			}}
		>
			<h3
				class="whitespace-nowrap border-2 border-transparent font-bold text-primary-900 dark:text-secondary-300"
			>
				{s.status}
			</h3>
		</Button>
		{#if $windowWidth >= 768}
			<Tooltip placement="right">Rename status</Tooltip>
		{/if}
	{/if}
	{#if showDelete === s.id || ($windowWidth <= 1024 && !edit)}
		<div in:fade>
			<DeleteStatusButton {s} />
		</div>
	{/if}
</div>
