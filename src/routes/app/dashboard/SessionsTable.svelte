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
	import { filteredSessions, startRow, endRow, filteredDistractions, openRow } from './stores';
	import {
		dateFromTimestamp,
		millisecondsToClock,
		timeFromTimestamp
	} from '$lib/functions/functions';
	import DeleteSession from './DeleteSession.svelte';
	import { slide } from 'svelte/transition';

	const toggleRow = (i: number) => {
		$openRow = $openRow === i ? null : i;
	};

	function previous() {
		$startRow = $startRow === 0 ? $startRow : $startRow - 10;
		$endRow = $endRow === 9 ? $endRow : $endRow - 10;
		$openRow = null;
	}

	function page(p: number) {
		$startRow = 0 + p * 10;
		$endRow = 9 + p * 10;
		$openRow = null;
	}

	function next() {
		if ($endRow <= $filteredSessions.length) {
			$startRow += 10;
			$endRow += 10;
			$openRow = null;
		}
	}

	let pages: number;
	$: pages = Math.ceil($filteredSessions.length / 10);
</script>

<Table hoverable shadow>
	<TableHead class="bg-primary-700 text-center text-primary-50">
		<TableHeadCell class="px-2">Date</TableHeadCell>
		<TableHeadCell class="px-2">Duration</TableHeadCell>
		<TableHeadCell></TableHeadCell>
	</TableHead>
	<TableBody>
		{#each $filteredSessions as session, i}
			{#if i >= $startRow && i <= $endRow}
				<TableBodyRow
					class="cursor-pointer border-primary-800 bg-primary-900 text-center hover:bg-primary-800 lg:text-base"
				>
					<TableBodyCell class="p-2 font-light text-primary-50" on:click={() => toggleRow(i)}
						>{dateFromTimestamp(session.start)}</TableBodyCell
					>
					<TableBodyCell class="p-2 font-light text-primary-50" on:click={() => toggleRow(i)}
						>{millisecondsToClock(session.duration)}</TableBodyCell
					>
					<TableBodyCell class="w-0 px-0 py-2"><DeleteSession {session} /></TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if $openRow === i}
				<TableBodyRow class="border-primary-800">
					<TableBodyCell colspan="3" class="bg-primary-900 p-0 text-primary-200">
						<div
							class="grid grid-cols-2 place-items-center justify-evenly gap-2 p-2 font-light md:grid-cols-3"
							transition:slide
						>
							<p class="col-start-1">
								<i class="fa-solid fa-play pr-1" />{timeFromTimestamp(session.start)}
							</p>
							<div
								class="col-span-2 col-start-1 row-start-2 grid justify-items-start md:col-span-1 md:col-start-2 md:row-start-1"
							>
								{#each Object.entries($filteredDistractions.filter((x) => x.session_id === session.id)) as distraction}
									<div class="flex items-center justify-center font-extralight">
										<i class="fa-solid fa-pause pr-1" />
										<p>{timeFromTimestamp(distraction[1].start)} -&nbsp</p>
										<p>{timeFromTimestamp(distraction[1].end)}</p>
										<p class="pl-1">({distraction[1].reason})</p>
									</div>
								{/each}
							</div>
							<p class="col-start-2 md:col-start-3">
								<i class="fa-solid fa-stop pr-1" />{timeFromTimestamp(session.end)}
							</p>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
<div class="flex w-full justify-center pt-2">
	<ButtonGroup>
		<Button
			disabled={$startRow === 0 ? true : false}
			class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0"
			on:click={previous}><i class="fa-solid fa-chevron-left" /></Button
		>
		{#each { length: pages } as _, p}
			{#if p === $startRow / 10}
				<Button
					disabled
					class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
					>{p + 1}</Button
				>
			{:else if (p < 5 && $startRow < 30) || (p > ($startRow - 30) / 10 && p < ($startRow + 30) / 10) || (p >= pages - 5 && ($startRow - 30) / 10 >= pages - 5)}
				<Button
					class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
					on:click={() => page(p)}>{p + 1}</Button
				>
			{/if}
		{/each}
		<Button
			disabled={$endRow >= $filteredSessions.length - 1 ? true : false}
			class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0"
			on:click={next}><i class="fa-solid fa-chevron-right" /></Button
		>
	</ButtonGroup>
</div>
