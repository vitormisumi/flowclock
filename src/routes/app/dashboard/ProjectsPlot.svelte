<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { filteredSessions } from './stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredSessions.reduce(
				(distribution, item) => {
					distribution[item.project_id || 'no project'] =
						(distribution[item.project_id || 'no project'] || 0) +
						(group === 'frequency' ? 1 : item.duration ?? 0);
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => y[1] - x[1])
	);

	$: console.log(Object.keys(distribution).length);
</script>

<svg
	width="100%"
	height={(Object.keys(distribution).length + 1) * 50}
	class="rounded-xl bg-primary-900 p-2"
>
	{#each Object.entries(distribution) as project, i}
		<text x="48%" y={i * 50 + 30} text-anchor="end" class="fill-primary-50 capitalize">
			{$projects.find((x) => x.id === Number(project[0]))?.name || project[0]}
		</text>
		<rect
			x="50%"
			y={i * 50 + 5}
			height="40"
			width="{(project[1] /
				Object.values(distribution).reduce((accumulator, i) => {
					return accumulator + i;
				}, 0)) *
				50}%"
			rx="1%"
			class="fill-primary-700"
		/>
		<text x="52%" y={i * 50 + 30} class="fill-primary-50 text-sm capitalize">
			{group === 'frequency' ? project[1] : millisecondsToClock(project[1])}
		</text>
	{/each}
	<line
		x1="50%"
		y1="0"
		x2="50%"
		y2={Object.keys(distribution).length * 50}
		class="stroke-primary-800"
	/>
	<text x="50%" y="98%" text-anchor="middle" class="fill-primary-50" font-weight="lighter">
		{group} of sessions
	</text>
</svg>
