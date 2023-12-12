<script lang="ts">
	import { Button, Card, Dropdown, Radio } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import ProjectsPlot from './ProjectsPlot.svelte';

	$: filteredProjects = new Set($filteredSessions.map((x) => x.project_id)).size;

	$: sessionsPerProject = isNaN($filteredSessions.length / filteredProjects)
		? '-'
		: ($filteredSessions.length / filteredProjects).toFixed(1);

	let group: string = 'frequency';

	let open = false;

	let options: string[] = ['frequency', 'duration'];
</script>

<Card class="min-h-full min-w-full border-0 bg-primary-800 lg:h-[max(50vh,_570px)]">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Projects</h2>
			<p class="text-center text-accent-500 md:text-xl">
				{filteredProjects}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Sessions/Project</h2>
			<p class="text-center text-accent-500 md:text-xl">{sessionsPerProject}</p>
		</div>
		<Button size="xs" class="bg-primary-800 transition-colors hover:bg-primary-700">
			<i class="fa-solid fa-sort" />
		</Button>
		<Dropdown class="grid gap-2 rounded-lg bg-primary-50 p-3" bind:open>
			{#each options as option}
				<li>
					<Radio
						name="sort"
						bind:group
						value={option}
						on:click={() => (open = false)}
						class="text-primary-900"
						>{option}
					</Radio>
				</li>
			{/each}
		</Dropdown>
	</div>
	{#if $filteredSessions.length}
		<ProjectsPlot {group} />
	{/if}
</Card>
