<script lang="ts">
	import {
		Table,
		TableHead,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		ButtonGroup,
		Button
	} from 'flowbite-svelte';
	import { filteredSessions, startRow, endRow, filteredInterruptions, openRow } from './stores';
	import {
		dateFromTimestamp,
		millisecondsToClock,
		timeFromTimestamp
	} from '$lib/functions/functions';
	import DeleteSession from './DeleteSessionButton.svelte';
	import { fade, slide } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	let edit: number | null = null;

	function toggleRow(i: number) {
		$openRow = $openRow === i ? null : i;
	}

	function mouseEnter(i: number) {
		edit = i;
	}

	function mouseLeave() {
		edit = null;
	}

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
		<div class="flex justify-around p-2 font-bold">
			<p>Date</p>
			<p>Duration</p>
		</div>
	</TableHead>
	<TableBody>
		{#each $filteredSessions as session, i}
			{#if i >= $startRow && i <= $endRow}
				<TableBodyRow
					class="cursor-pointer border-primary-800 bg-primary-900 text-center hover:bg-primary-800"
				>
					<div
						class="relative flex justify-around font-light text-primary-50"
						role="row"
						tabindex={i}
						on:mouseenter={() => mouseEnter(i)}
						on:mouseleave={mouseLeave}
					>
						<div
							class="w-full p-2"
							role="cell"
							tabindex="0"
							on:click={() => toggleRow(i)}
							on:keydown={() => toggleRow(i)}
						>
							{dateFromTimestamp(session.start, $settings.date_format, $settings.separator)}
						</div>
						<div
							class="w-full p-2"
							role="cell"
							tabindex="0"
							on:click={() => toggleRow(i)}
							on:keydown={() => toggleRow(i)}
						>
							{millisecondsToClock(Date.parse(session.end) - Date.parse(session.start))}
						</div>
						{#if edit === i}
							<div class="absolute right-1 top-1" in:fade>
								<DeleteSession {session} />
							</div>
						{/if}
					</div>
				</TableBodyRow>
			{/if}
			{#if $openRow === i}
				<TableBodyRow class="border-primary-800">
					<TableBodyCell colspan="3" class="bg-primary-900 p-0">
						<div
							class="grid grid-cols-2 place-items-center justify-evenly p-2 font-light"
							transition:slide
						>
							<p class="col-start-1 text-primary-100">
								<i class="fa-solid fa-play pr-1" />{timeFromTimestamp(
									session.start,
									$settings.clock_format
								)}
							</p>
							<p class="col-start-2 text-primary-100">
								<i class="fa-solid fa-stop pr-1" />{timeFromTimestamp(
									session.end,
									$settings.clock_format
								)}
							</p>
							<div class="col-span-2 col-start-1 row-start-2 grid justify-items-start">
								{#each Object.entries($filteredInterruptions.filter((x) => x.session_id === session.id)) as interruption}
									<div class="flex items-center justify-center font-extralight text-secondary-100">
										<i class="fa-solid fa-pause pr-1" />
										<p>{timeFromTimestamp(interruption[1].start, $settings.clock_format)} -&nbsp</p>
										<p>{timeFromTimestamp(interruption[1].end, $settings.clock_format)}</p>
										{#if interruption[1].reason}
											<p class="pl-1">({interruption[1].reason})</p>
										{/if}
									</div>
								{/each}
							</div>
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
			on:click={previous}
		>
			<i class="fa-solid fa-chevron-left" />
		</Button>
		{#each { length: pages } as _, p}
			{#if p === $startRow / 10}
				<Button
					disabled
					class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
				>
					{p + 1}
				</Button>
			{:else if (p < 5 && $startRow < 30) || (p > ($startRow - 30) / 10 && p < ($startRow + 30) / 10) || (p >= pages - 5 && ($startRow - 30) / 10 >= pages - 5)}
				<Button
					class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
					on:click={() => page(p)}
				>
					{p + 1}
				</Button>
			{/if}
		{/each}
		<Button
			disabled={$endRow >= $filteredSessions.length - 1 ? true : false}
			class="border-primary-700 bg-primary-900 font-mono text-primary-100 hover:bg-primary-800 hover:text-primary-500 focus:ring-0"
			on:click={next}
		>
			<i class="fa-solid fa-chevron-right" />
		</Button>
	</ButtonGroup>
</div>
