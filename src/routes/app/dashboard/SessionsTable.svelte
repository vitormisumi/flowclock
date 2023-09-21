<script lang="ts">
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		ButtonGroup,
		Button
	} from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import {
		dateFromTimestamp,
		millisecondsToClock,
		timeFromTimestamp
	} from '$lib/functions/functions';
	import DeleteSession from './DeleteSession.svelte';
	import { slide } from 'svelte/transition';

	let openRow: null | number;
	const toggleRow = (i: number) => {
		openRow = openRow === i ? null : i;
	};

	let startRow: number = 0;
	let endRow: number = 9;

	function previous() {
		startRow = startRow === 0 ? startRow : startRow - 10;
		endRow = endRow === 9 ? endRow : endRow - 10;
	}

	function page(p: number) {
		startRow = 0 + p * 10;
		endRow = 9 + p * 10;
	}

	function next() {
		if (endRow <= $filteredSessions.length) {
			startRow += 10;
			endRow += 10;
		}
	}

	let pages: number;
	$: pages = Math.ceil($filteredSessions.length / 10);

	let pagination =
		'border-primary-700 bg-primary-900 text-primary-100 focus:ring-0 hover:bg-primary-800 hover:text-primary-500 font-mono';
	let disabledPagination =
		'border-primary-700 bg-secondary-900 text-secondary-700 hover:bg-secondary-900 font-mono';
</script>

<Table hoverable shadow>
	<TableHead class="bg-primary-700 text-center text-primary-50">
		<TableHeadCell class="px-2">Date</TableHeadCell>
		<TableHeadCell class="px-2">Duration</TableHeadCell>
		<TableHeadCell></TableHeadCell>
	</TableHead>
	<TableBody>
		{#each $filteredSessions as session, i}
			{#if i >= startRow && i <= endRow}
				<TableBodyRow
					class="cursor-pointer border-primary-800 bg-primary-900 text-center hover:bg-primary-800"
				>
					<TableBodyCell class="p-2 font-light text-primary-50" on:click={() => toggleRow(i)}
						>{dateFromTimestamp(session.start)}</TableBodyCell
					>
					<TableBodyCell class="p-2 font-light text-primary-50" on:click={() => toggleRow(i)}
						>{millisecondsToClock(session.duration)}</TableBodyCell
					>
					<TableBodyCell class="px-0 py-2"><DeleteSession {session} /></TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if openRow === i}
				<TableBodyRow class="border-primary-800">
					<TableBodyCell colspan="3" class="bg-primary-900 p-0 text-primary-200">
						<div class="flex justify-around gap-4 p-2 font-light" transition:slide>
							<p><i class="fa-solid fa-play pr-1" />{timeFromTimestamp(session.start)}</p>
							<p><i class="fa-solid fa-stop pr-1" />{timeFromTimestamp(session.end)}</p>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
<div class="flex w-full justify-center pt-2">
	<ButtonGroup>
		{#if startRow === 0}
			<Button disabled class={disabledPagination}><i class="fa-solid fa-chevron-left" /></Button>
		{:else}
			<Button class={pagination} on:click={previous}><i class="fa-solid fa-chevron-left" /></Button>
		{/if}
		{#each { length: pages } as _, p}
			{#if p === startRow / 10}
				<Button disabled class={disabledPagination}>{p + 1}</Button>
			{:else if (p < 5 && startRow < 30) || (p > (startRow - 30) / 10 && p < (startRow + 30) / 10) || (p >= pages - 5 && (startRow - 30) / 10 >= pages - 5)}
				<Button class={pagination} on:click={() => page(p)}>{p + 1}</Button>
			{/if}
		{/each}
		{#if endRow >= $filteredSessions.length - 1}
			<Button disabled class={disabledPagination}><i class="fa-solid fa-chevron-right" /></Button>
		{:else}
			<Button class={pagination} on:click={next}><i class="fa-solid fa-chevron-right" /></Button>
		{/if}
	</ButtonGroup>
</div>
