<script lang="ts">
	import { Button, Tooltip, Drawer, Input } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import ProjectList from './ProjectList.svelte';

	let edit = false;

	let hidden = true;

	let open = false;

	let loading = false;

	$: if (hidden) {
		edit = false;
		open = false;
	} else if (open) {
		edit = false;
	}

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button size="sm" on:click={() => (hidden = false)}
	>{$selectedProject.name === '' ? 'Projects' : $selectedProject.name}<i
		class="fa-solid fa-chevron-down pl-2"
	/></Button
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
	<div class="grid gap-4">
		<h2 class="text-center font-bold text-primary-50">Projects</h2>
		<div class="flex justify-end">
			<Button size="xs" class="bg-transparent" on:click={() => (edit = !edit)}>
				<i class="fa-solid {edit ? 'fa-x' : 'fa-pen'} w-3" />
			</Button>
			<Tooltip>Edit groups</Tooltip>
		</div>
		<ProjectList {edit} {hidden}/>
		<hr class="w-full border-secondary-800" />
		{#if !open}
			<Button
				size="xs"
				type="submit"
				class="self-center bg-transparent text-secondary-400 hover:bg-secondary-800 hover:text-secondary-100 focus:ring-0"
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
