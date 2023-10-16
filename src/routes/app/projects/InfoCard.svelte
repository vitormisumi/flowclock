<script lang="ts">
	import { Badge, Button, Card, Tooltip } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
	import type { Writable } from 'svelte/store';
	import type { ProjectGroup } from '../types';
	import { getContext } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let show = false;

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});

	let hidden = false;
</script>

<Card
	class="grid h-full w-1/3 min-w-full gap-4 border-0 bg-primary-800 text-primary-50"
	on:mouseenter={() => (show = true)}
	on:mouseleave={() => (show = false)}
>
	<div class="flex h-6 justify-between">
		<div class="flex gap-2">
			<h2 class="font-bold">{$selectedProject.name}</h2>
			<Badge class="bg-accent-500 text-accent-50">{$selectedProject.status}</Badge>
			<Badge class="bg-primary-50"
				>#{groupOptions.find((x) => x.value === $selectedProject.group_id)?.name}</Badge
			>
		</div>
		{#if show}
			<div transition:fly>
				<Button
					size="xs"
					class="bg-transparent hover:bg-primary-700"
					on:click={() => (hidden = !hidden)}
					><i class="fa-solid {hidden ? 'fa-eye' : 'fa-eye-slash'}"></i></Button
				>
				<Tooltip>{hidden ? 'Show card' : 'Hide card'}</Tooltip>
				<EditProjectButton />
				<DeleteProjectButton />
			</div>
		{/if}
	</div>
	{#if !hidden}
		<div class="grid gap-4 text-secondary-50" transition:slide>
			<div>
				<h3 class="font-medium">Goal</h3>
				<p class="text-secondary-200">{$selectedProject.goal}</p>
			</div>
			<div>
				<h3 class="font-medium">Description</h3>
				<p class="text-secondary-200">{$selectedProject.description}</p>
			</div>
		</div>
	{/if}
</Card>
