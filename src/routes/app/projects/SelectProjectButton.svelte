<script lang="ts">
	import { Button, Tooltip, Drawer, Input } from 'flowbite-svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Project } from '../types';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const projects: Writable<Project[]> = getContext('projects');

	let hidden = true;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};

	let button: boolean;
	$: button = $projects.length ? true : false;
</script>

<Button on:click={() => (hidden = false)} class="w-40 {button ? 'visible' : 'invisible'}"
	>{$selectedProject.name}<i class="fa-solid fa-chevron-down pl-2" /></Button
>
<Tooltip>Select project</Tooltip>
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-52 md:w-60 lg:w-80"
	class="z-50 bg-primary-900"
	bind:hidden
>
	<div class="grid gap-2">
		<h2 class="text-center font-bold text-primary-50">Projects</h2>
		{#each $projects as project}
			<Button
				class="{project.id != $selectedProject.id
					? 'border border-primary-700 bg-transparent'
					: ''}"
				on:click={() => {
					$selectedProjectId = project.id;
					hidden = true;
				}}>{project.name}</Button
			>
		{/each}
		{#if !open}
			<Button
				size="sm"
				type="submit"
				class="self-center bg-transparent text-secondary-400"
				on:click={() => (open = true)}><i class="fa-solid fa-plus pr-2" />new group</Button
			>
		{/if}
		{#if open}
			<form
				class="flex gap-2 text-left"
				method="POST"
				action="?/addGroup"
				use:enhance={handleClick}
			>
				<Input
					name="name"
					placeholder="Group name"
					class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
				></Input>
				<Button size="xs" type="submit" class="bg-accent-500 hover:bg-accent-600" disabled={loading}
					><i class="fa-solid fa-save pr-2" />Save</Button
				>
			</form>
		{/if}
	</div>
</Drawer>
