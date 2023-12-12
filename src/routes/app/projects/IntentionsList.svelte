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

<ul class="grid gap-1">
	{#each $intentions as intention, i}
		{#if intention.project_id === $selectedProject.id}
			<li
				class="grid w-full rounded-lg bg-gradient-to-r from-primary-800 border border-primary-900 to-primary-900"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
			>
				<div class="flex gap-2 overflow-hidden px-2">
					<button
						class="h-10 grow overflow-hidden text-left font-light text-primary-50"
						on:click={() => (openRow = openRow === i ? null : i)}
						on:keydown={() => (openRow = openRow === i ? null : i)}
						>{intention.name}
					</button>
					{#if openEdit === i}
						<div in:fade class="flex py-1.5">
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
			</li>
		{/if}
	{/each}
</ul>
