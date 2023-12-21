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
				class="grid w-full rounded-lg border border-primary-900 bg-gradient-to-r from-primary-800 to-primary-900"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
			>
				<div class="flex gap-2 overflow-hidden px-2">
					<button
						class="h-10 grow overflow-hidden text-left font-light text-primary-50 {intention.description
							? 'cursor-pointer'
							: 'cursor-auto'}"
						on:click={() => (openRow = intention.description && openRow === null ? i : null)}
						on:keydown={() => (openRow = intention.description && openRow === null ? i : null)}
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
