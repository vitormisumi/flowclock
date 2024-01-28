<script lang="ts">
	import { Badge, Card } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import ProjectMenu from './ProjectMenu.svelte';

	const settings: Writable<Settings> = getContext('settings');
	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	export let open: boolean;

	let hidden = $settings.project_card_hidden;

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});
</script>

<Card
	class="grid min-w-full gap-4 border-0 bg-secondary-100 text-primary-900 dark:bg-secondary-800 dark:text-primary-50"
>
	<div class="flex place-items-center justify-between md:h-7">
		<div class="flex flex-wrap place-items-center justify-items-start gap-2">
			<h2 class="font-bold">{$selectedProject.name}</h2>
			<Badge class="bg-accent-500 text-accent-50 dark:bg-accent-500 dark:text-accent-50"
				>{$selectedProject.status}</Badge
			>
			<Badge
				class="bg-secondary-900 text-secondary-50 dark:bg-secondary-50 dark:text-secondary-900"
			>
				#{groupOptions.find((x) => x.value === $selectedProject.group_id)?.name}
			</Badge>
		</div>
		<ProjectMenu bind:hidden bind:open />
	</div>
	{#if !hidden}
		<div class="grid gap-4 dark:text-secondary-50" transition:slide>
			<div>
				<h3 class="font-medium">Goal</h3>
				<p class="dark:text-secondary-200">{$selectedProject.goal}</p>
			</div>
			<div>
				<h3 class="font-medium">Description</h3>
				<p class="dark:text-secondary-200">{$selectedProject.description}</p>
			</div>
		</div>
	{/if}
</Card>
