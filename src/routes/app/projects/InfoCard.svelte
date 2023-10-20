<script lang="ts">
	import { Badge, Button, Card, Tooltip } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { getContext } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
	import type { Writable } from 'svelte/store';

	let show = false;

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});

	let hidden = false;
</script>

<Card
	class="grid h-full min-w-full gap-4 border-0 bg-primary-800 text-primary-50"
	on:mouseenter={() => (show = true)}
	on:mouseleave={() => (show = false)}
>
	<div class="flex justify-between h-8">
		<div class="grid gap-2 md:flex h-fit">
			<h2 class="font-bold">{$selectedProject.name}</h2>
			<Badge class="bg-accent-500 text-accent-50">{$selectedProject.status}</Badge>
			<Badge class="bg-primary-50">
				#{groupOptions.find((x) => x.value === $selectedProject.group_id)?.name}
			</Badge>
		</div>
		{#if show}
			<div class="grid md:flex" in:fade>
				<Button
					size="xs"
					class="bg-transparent hover:bg-primary-700"
					on:click={() => (hidden = !hidden)}
				>
					<i class="fa-solid {hidden ? 'fa-eye' : 'fa-eye-slash'}" />
				</Button>
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
