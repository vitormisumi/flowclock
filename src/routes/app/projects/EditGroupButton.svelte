<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
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
	class="flex h-8 w-full items-center justify-center gap-2"
	on:mouseenter={() => {
		if (!edit) {
			showDelete = group.id;
		}
	}}
	on:mouseleave={() => (showDelete = 0)}
	role="group"
>
	<hr class="w-full border-secondary-800" />
	{#if edit === group.id}
		<form class="flex gap-1" method="POST" action="?/editGroup" use:enhance={handleClick}>
			<input
				type="text"
				name="name"
				placeholder={group.name}
				class="w-32 rounded-md bg-transparent text-secondary-300 focus:border-primary-700 focus:ring-0"
			/>
			<Button size="xs" on:click={() => (edit = 0)}>
				Cancel
			</Button>
			<Button type="submit" size="xs" class="bg-accent-500 hover:bg-accent-600">Save</Button>
		</form>
	{:else}
		<Button
			class="cursor-text bg-transparent hover:bg-transparent focus:ring-0"
			on:click={() => {
				edit = group.id;
				showDelete = 0;
			}}
			on:keypress={() => {
				edit = group.id;
				showDelete = 0;
			}}
		>
			<h3 class="whitespace-nowrap text-sm font-bold text-secondary-300">
				{group.name}
			</h3>
		</Button>
	{/if}
	<div class="flex w-full items-center">
		<hr class="w-full border-secondary-800" />
		{#if showDelete === group.id}
			<div in:fade>
				<DeleteGroupButton {group} />
			</div>
		{/if}
	</div>
</div>
