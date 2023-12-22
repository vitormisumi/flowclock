<script lang="ts">
	import { ButtonGroup, Button } from 'flowbite-svelte';
	import { filteredSessions, startRow, endRow, openRow } from './stores';
	import { dateFromTimestamp, millisecondsToClock } from '$lib/functions/functions';
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import DeleteSession from './DeleteSessionButton.svelte';
	import SessionDetails from './SessionDetails.svelte';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	let edit: number | null = null;

	function rowClick(i: number) {
		$openRow = $openRow === i ? null : i;
	}

	function rowPress(e: KeyboardEvent, i: number) {
		if (e.key === 'Enter') {
			$openRow = $openRow === i ? null : i;
		}
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

<div class="flex h-full flex-col justify-between gap-2">
	<table class="w-full table-fixed overflow-hidden rounded-xl">
		<thead class="bg-primary-700 text-center font-bold text-primary-50">
			<tr>
				<th class="py-1">Date</th>
				<th class="py-1">Duration</th>
			</tr>
		</thead>
		<tbody class="text-sm font-light text-primary-50">
			{#each $filteredSessions as session, i}
				{#if i >= $startRow && i <= $endRow}
					<tr
						class="relative cursor-pointer border-t border-primary-800 bg-primary-900 text-center transition-colors hover:bg-primary-800"
						tabindex="0"
						on:click={() => rowClick(i)}
						on:keydown={(e) => rowPress(e, i)}
						on:mouseenter={() => mouseEnter(i)}
						on:focus={() => mouseEnter(i)}
						on:mouseleave={mouseLeave}
					>
						<td class="p-2">
							{dateFromTimestamp(session.start, $settings.date_format, $settings.separator)}
						</td>
						<td class="p-2">
							{millisecondsToClock(session.focused_duration)}
							{#if edit === i}
								<div class="absolute right-1 top-1 z-10" in:fade>
									<DeleteSession {session} />
								</div>
							{/if}
						</td>
					</tr>
				{/if}
				{#if $openRow === i}
					<SessionDetails {session} />
				{/if}
			{/each}
		</tbody>
	</table>
	<div class="flex w-full justify-center">
		<ButtonGroup>
			<Button
				disabled={$startRow === 0 ? true : false}
				class="border-primary-700 bg-primary-900 font-mono text-primary-100 transition-colors hover:bg-primary-800 hover:text-primary-500 focus:ring-0"
				on:click={previous}
			>
				<i class="fa-solid fa-chevron-left" />
			</Button>
			{#each { length: pages } as _, p}
				{#if p === $startRow / 10}
					<Button
						disabled
						class="border-primary-700 bg-primary-900 font-mono text-primary-100 transition-colors hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
					>
						{p + 1}
					</Button>
				{:else if (p < 5 && $startRow < 30) || (p > ($startRow - 30) / 10 && p < ($startRow + 30) / 10) || (p >= pages - 5 && ($startRow - 30) / 10 >= pages - 5)}
					<Button
						class="border-primary-700 bg-primary-900 font-mono text-primary-100 transition-colors hover:bg-primary-800 hover:text-primary-500 focus:ring-0 max-[356px]:hidden"
						on:click={() => page(p)}
					>
						{p + 1}
					</Button>
				{/if}
			{/each}
			<Button
				disabled={$endRow >= $filteredSessions.length - 1 ? true : false}
				class="border-primary-700 bg-primary-900 font-mono text-primary-100 transition-colors hover:bg-primary-800 hover:text-primary-500 focus:ring-0"
				on:click={next}
			>
				<i class="fa-solid fa-chevron-right" />
			</Button>
		</ButtonGroup>
	</div>
</div>
