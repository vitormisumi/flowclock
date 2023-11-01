<script lang="ts">
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import EditIntentionButton from './EditIntentionButton.svelte';
	import DeleteIntentionButton from './DeleteIntentionButton.svelte';
	import StartIntentionButton from './StartIntentionButton.svelte';
	import type { Writable } from 'svelte/store';

	const intentions: Writable<Intention[]> = getContext('intentions');

	let openRow: number | null = null;

	let openEdit: number | null = null;
</script>

<div class="grid gap-1">
	{#each $intentions as intention, i}
		{#if intention.project_id === $selectedProject.id}
			<button
				class="grid rounded-lg border border-primary-900 bg-gradient-to-r from-primary-800 to-primary-900 px-2 py-1 font-light text-primary-50 lg:text-base"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
				on:click={() => (openRow = openRow === i ? null : i)}
				on:keydown={() => (openRow = openRow === i ? null : i)}
			>
				<div class="flex h-8 w-full items-center justify-between">
					<p>{intention.name}</p>
					{#if openEdit === i}
						<div in:fade class="flex">
							<StartIntentionButton {intention} />
							<EditIntentionButton {intention} />
							<DeleteIntentionButton {intention} />
						</div>
					{/if}
				</div>
				{#if openRow === i}
					<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
						{#if intention.description}
							<p class="whitespace-normal text-primary-100">
								{intention.description}
							</p>
						{/if}
					</div>
				{/if}
			</button>
		{/if}
	{/each}
</div>
