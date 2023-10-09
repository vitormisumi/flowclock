<script lang="ts">
	import { Badge, Button, Card, Modal, Label, Input, Select, Tooltip } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { enhance } from '$app/forms';

	let open: boolean = false;

	let statusOptions = [
		{ name: 'idea', value: 'idea' },
		{ name: 'planning', value: 'planning' },
		{ name: 'execution', value: 'execution' },
		{ name: 'completed', value: 'completed' },
		{ name: 'suspended', value: 'suspended' },
		{ name: 'cancelled', value: 'cancelled' }
	];
</script>

<Card class="h-full w-1/3 min-w-full border-0 bg-primary-800 text-primary-50">
	<div class="flex justify-between">
		<Badge class="bg-accent-500 text-accent-50">{$selectedProject.status}</Badge>
		<Button size="xs" class="bg-transparent hover:bg-primary-700" on:click={() => (open = true)}
			><i class="fa-solid fa-pen text-primary-50" /></Button
		>
        <Tooltip>Edit project</Tooltip>
	</div>
	<p>name: {$selectedProject.name}</p>
	<p>goal: {$selectedProject.goal}</p>
	<p>description: {$selectedProject.description}</p>
</Card>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<h2 class="text-lg font-bold text-primary-50">Edit project {$selectedProject.name}</h2>
	<form class="flex flex-col gap-4 text-left" method="POST" action="?/editProject" use:enhance>
		<Label for="name" class="text-primary-50"
			>Name
			<Input name="name" value={$selectedProject.name} class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="goal" class="text-primary-50"
			>Goal
			<Input name="goal" value={$selectedProject.goal} class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="description" class="text-primary-50"
			>Description
			<Input name="description" value={$selectedProject.description} class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="status" class="text-primary-50"
			>Status
			<Select items={statusOptions} name="status" value={$selectedProject.status} class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
        <input type="number" name='id' hidden value={$selectedProject.id}>
		<Button type="submit" on:click={() => (open = false)}>Update project</Button>
	</form>
</Modal>
