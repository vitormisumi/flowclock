<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Card,
		Modal,
		Pagination,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import {
		dateFromTimestamp,
		millisecondsToClock,
		timeFromTimestamp
	} from '$lib/functions/functions';
	import { slide } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + object.duration;
	}, 0);

	let openRow: null | number;

	const toggleRow = (i: number) => {
		openRow = openRow === i ? null : i;
	};

	let pages: number;
	$: pages = Math.ceil($filteredSessions.length / 10);

	let startRow: number = 0;
	let endRow: number = 9;

	let open: boolean = false;
	let sessionId: number | null;
	$: sessionToDelete = $filteredSessions.find(({ id }) => id === sessionId);

	let loading: boolean = false;

	const handleSave: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

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

	let paginationClass =
		'border-primary-700 bg-primary-900 text-primary-100 focus:ring-0 hover:bg-primary-800 hover:text-primary-500 font-mono';

	let disabledPagination =
		'border-primary-700 bg-secondary-900 text-secondary-700 hover:bg-secondary-900 font-mono';
</script>

<Card size="sm" class="border-0 bg-primary-800">
	<div class="flex justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="font-semibold text-primary-50 md:text-xl">Sessions</h2>
			<p class="text-lg font-light text-accent-500 md:text-2xl">
				{$filteredSessions.length}
			</p>
		</div>
		<div>
			<h2 class="font-semibold text-primary-50 md:text-xl">Total Duration</h2>
			<p class="text-lg font-light text-accent-500 md:text-2xl">
				{millisecondsToClock(duration)}
			</p>
		</div>
	</div>
	<Table hoverable shadow>
		<TableHead class="bg-primary-700 text-primary-50">
			<TableHeadCell class="px-2 text-center">Date</TableHeadCell>
			<TableHeadCell class="px-2 text-center">Duration</TableHeadCell>
			<TableHeadCell class="px-2 text-center"></TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $filteredSessions as session, i}
				{#if i >= startRow && i <= endRow}
					<TableBodyRow
						class="cursor-pointer border-primary-800 bg-primary-900 hover:bg-primary-800"
					>
						<TableBodyCell
							class="p-2 text-center font-light text-primary-50"
							on:click={() => toggleRow(i)}>{dateFromTimestamp(session.start)}</TableBodyCell
						>
						<TableBodyCell
							class="p-2 text-center font-light text-primary-50"
							on:click={() => toggleRow(i)}>{millisecondsToClock(session.duration)}</TableBodyCell
						>
						<TableBodyCell class="px-0 py-2 text-center font-light text-primary-50"
							><Button
								size="xs"
								class="bg-transparent hover:bg-primary-700"
								disabled={loading}
								on:click={() => {
									open = true;
									sessionId = session.id;
								}}><i class="fa-solid fa-trash"></i></Button
							></TableBodyCell
						>
					</TableBodyRow>
				{/if}
				{#if openRow === i}
					<TableBodyRow class="border-primary-800">
						<TableBodyCell colspan="3" class="bg-primary-900 p-0 text-primary-200">
							<div class="flex justify-around gap-4 p-2" transition:slide>
								<p class="font-light">
									<i class="fa-solid fa-play"></i>
									{timeFromTimestamp(session.start)}
								</p>
								<p class="font-light">
									<i class="fa-solid fa-stop"></i>
									{timeFromTimestamp(session.end)}
								</p>
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
	<Modal bind:open outsideclose size="sm" class="bg-secondary-900">
		<i class="fa-solid fa-warning w-full text-center text-3xl text-red-700"></i>
		<p class="text-center">
			Are you sure you want to delete your session at {dateFromTimestamp(sessionToDelete?.start)} from
			{timeFromTimestamp(sessionToDelete?.start)} to {timeFromTimestamp(sessionToDelete?.end)}?
		</p>
		<form
			class="flex w-full justify-center gap-4"
			method="POST"
			action="?/deleteSession"
			use:enhance={handleSave}
			use:enhance={({ formData }) => {
				formData.append('session_id', JSON.stringify(sessionId));
			}}
		>
			<Button
				class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
				type="submit"
				on:click={() => (open = false)}>Delete</Button
			>
			<Button on:click={() => (open = false)}>Cancel</Button>
		</form>
	</Modal>
	<div class="flex w-full justify-center pt-2">
		<ButtonGroup>
			{#if startRow === 0}
				<Button disabled class={disabledPagination}><i class="fa-solid fa-chevron-left"></i></Button
				>
			{:else}
				<Button class={paginationClass} on:click={previous}
					><i class="fa-solid fa-chevron-left"></i></Button
				>
			{/if}
			{#each { length: pages } as _, p}
				{#if p === startRow / 10}
					<Button disabled class={disabledPagination}>{p + 1}</Button>
				{:else if (p < 5 && startRow < 30) || (p > (startRow - 30) / 10 && p < (startRow + 30) / 10) || (p >= pages - 5 && (startRow - 30) / 10 >= pages - 5)}
					<Button class={paginationClass} on:click={() => page(p)}>{p + 1}</Button>
				{/if}
			{/each}
			{#if endRow > $filteredSessions.length}
				<Button disabled class={disabledPagination}
					><i class="fa-solid fa-chevron-right"></i></Button
				>
			{:else}
				<Button class={paginationClass} on:click={next}
					><i class="fa-solid fa-chevron-right"></i></Button
				>
			{/if}
		</ButtonGroup>
	</div>
</Card>
