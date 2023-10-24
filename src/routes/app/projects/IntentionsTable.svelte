<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import EditIntentionButton from './EditIntentionButton.svelte';
    import DeleteIntentionButton from './DeleteIntentionButton.svelte';

	const intentions: Writable<Intention[]> = getContext('intentions');

	let openRow: number | null = null;

	function toggleRow(i: number) {
		openRow = openRow === i ? null : i;
	}

	let openEdit: number | null = null;

	function mouseEnter(i: number) {
		openEdit = i;
	}

	function mouseLeave() {
		openEdit = null;
	}
</script>

<Table hoverable shadow>
	<TableBody>
		{#each $intentions as intention, i}
			{#if intention.project_id === $selectedProject.id}
				<TableBodyRow
					class="cursor-pointer border-primary-800 bg-gradient-to-r from-primary-900 to-primary-800 hover:bg-primary-800 lg:text-base"
				>
					<TableBodyCell class="p-0 font-light text-primary-50">
						<div
							class="flex h-10 items-center justify-between p-2"
							on:mouseenter={() => mouseEnter(i)}
							on:mouseleave={() => mouseLeave()}
							role="row"
							tabindex={i}
						>
							<div
								on:click={() => toggleRow(i)}
								on:keydown={() => toggleRow(i)}
								role="row"
								tabindex={i}
								class="w-full"
							>
								<p class="pl-2">
									{intention.name}
								</p>
							</div>
							{#if openEdit === i}
								<div transition:fade class="flex">
									<EditIntentionButton {intention} />
									<DeleteIntentionButton {intention} />
								</div>
							{/if}
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if openRow === i}
				<TableBodyRow class="border-primary-800">
					<TableBodyCell colspan="3" class="bg-primary-900 p-0">
						<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
							{#if intention.description}
								<p class="whitespace-normal text-primary-100">
									{intention.description}
								</p>
							{/if}
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
