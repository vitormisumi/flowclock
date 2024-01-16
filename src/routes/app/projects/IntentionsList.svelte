<script lang="ts">
	import { getContext } from 'svelte';
	import { selectedProject, windowWidth } from './stores';
	import { slide } from 'svelte/transition';
	import IntentionMenu from './IntentionMenu.svelte';
	import type { Writable } from 'svelte/store';

	const intentions: Writable<Intention[]> = getContext('intentions');

	let openRow: number | null = null;

	let showMenu: number | null = null;
</script>

<ul class="grid gap-1">
	{#each $intentions as intention, i}
		{#if intention.project_id === $selectedProject.id}
			<li
				class="grid w-full rounded-lg border border-primary-900 bg-gradient-to-r from-primary-800 to-primary-900"
				on:mouseenter={() => (showMenu = intention.id)}
				on:mouseleave={() => (showMenu = null)}
			>
				<div class="flex items-center gap-1 overflow-hidden px-2">
					<button
						class="h-10 grow overflow-hidden text-left text-sm font-light text-primary-50 md:text-base {intention.description
							? 'cursor-pointer'
							: 'cursor-auto'}"
						on:click={() => (openRow = intention.description && openRow === null ? i : null)}
						on:keydown={() => (openRow = intention.description && openRow === null ? i : null)}
						>{intention.name}
					</button>
					{#if showMenu === intention.id || $windowWidth < 768}
						<IntentionMenu {intention} bind:showMenu />
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
