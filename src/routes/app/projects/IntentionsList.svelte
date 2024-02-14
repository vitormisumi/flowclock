<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { isMobile } from '../stores';
	import IntentionMenu from './IntentionMenu.svelte';
	import { selectedProject } from './stores';

	const intentions: Writable<Intention[]> = getContext('intentions');

	let openRow: number | null = null;

	let showMenu: number | null = null;
</script>

<ul class="grid max-h-96 w-full gap-1 overflow-scroll">
	{#each $intentions as intention, i}
		{#if intention.project_id === $selectedProject.id}
			<li
				class="grid w-full rounded-lg border border-primary-50 bg-gradient-to-r from-secondary-50 to-secondary-100 dark:border-secondary-900 dark:from-secondary-800 dark:to-secondary-900"
				on:mouseenter={() => (showMenu = intention.id)}
				on:mouseleave={() => (showMenu = null)}
			>
				<div class="flex items-center gap-1 overflow-hidden px-2">
					<button
						class="h-10 grow overflow-hidden text-left text-sm font-light text-primary-900 dark:text-primary-50 md:text-base {intention.description
							? 'cursor-pointer'
							: 'cursor-auto'}"
						on:click={() => (openRow = intention.description && openRow === null ? i : null)}
						on:keydown={() => (openRow = intention.description && openRow === null ? i : null)}
						>{intention.name}
					</button>
					{#if showMenu === intention.id || $isMobile}
						<IntentionMenu {intention} bind:showMenu />
					{/if}
				</div>
				{#if openRow === i}
					<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
						{#if intention.description}
							<p class="whitespace-normal text-primary-800 dark:text-primary-100">
								{intention.description}
							</p>
						{/if}
					</div>
				{/if}
			</li>
		{/if}
	{/each}
	<div
		class="sticky bottom-0 h-8 w-full bg-gradient-to-b from-transparent to-secondary-100 dark:to-secondary-800"
	/>
</ul>
