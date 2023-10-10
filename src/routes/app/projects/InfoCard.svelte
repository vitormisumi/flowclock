<script lang="ts">
	import { Badge, Card, Tooltip } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
	import type { Writable } from 'svelte/store';
	import type { ProjectGroup } from '../types';
	import { getContext } from 'svelte';

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});
</script>

<Card class="h-full w-1/3 min-w-full border-0 bg-primary-800 text-primary-50">
	<div class="flex justify-between">
		<div>
			<Badge class="bg-accent-500 text-accent-50">{$selectedProject.status}</Badge>
			<Badge class="bg-primary-50"
				>#{groupOptions.find((x) => x.value === $selectedProject.group_id)?.name}</Badge
			>
		</div>
		<div>
			<EditProjectButton />
			<DeleteProjectButton />
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4 text-secondary-50">
		<p><i class="fa-solid fa-bullseye pr-2" />{$selectedProject.goal}</p>
		<p><i class="fa-solid fa-file-lines pr-2" />{$selectedProject.description}</p>
	</div>
</Card>
