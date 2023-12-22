<script lang="ts">
	import { filteredInterruptions } from './stores';
	import { slide } from 'svelte/transition';
	import { timeFromTimestamp } from '$lib/functions/functions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { Tooltip } from 'flowbite-svelte';

	const settings: Writable<Settings> = getContext('settings');
	const tasks: Writable<Task[]> = getContext('tasks');

	export let session: FilteredSession;
</script>

<tr class="border-b border-primary-800">
	<td colspan="2" class="bg-primary-900 p-0">
		<div class="grid grid-cols-2 place-items-center justify-evenly p-2 font-light text-primary-200" transition:slide>
			<p class="col-span-2">
				<i class="fa-solid fa-bullseye pr-1" />{$tasks.find((x) => x.id === session.task_id)?.name}
			</p>
            <Tooltip>Session focus</Tooltip>
			<p class="col-start-1 row-start-2">
                <i class="fa-solid fa-play pr-1" />{timeFromTimestamp(
                    session.start,
					$settings.clock_format
                    )}
			</p>
            <Tooltip>Start time</Tooltip>
			<p class="col-start-2 row-start-2">
                <i class="fa-solid fa-stop pr-1" />{timeFromTimestamp(session.end, $settings.clock_format)}
			</p>
            <Tooltip>End time</Tooltip>
			<div class="col-span-2 col-start-1 row-start-3 grid justify-items-start">
                {#each Object.entries($filteredInterruptions.filter((x) => x.session_id === session.id)) as interruption}
                <div class="flex items-center justify-center font-extralight text-secondary-100">
                    <i class="fa-solid fa-pause pr-1" />
                    <p>
                        {timeFromTimestamp(interruption[1].start, $settings.clock_format)} -&nbsp
                    </p>
                    <p>{timeFromTimestamp(interruption[1].end, $settings.clock_format)}</p>
                    {#if interruption[1].reason}
                    <p class="pl-1">({interruption[1].reason})</p>
                    {/if}
                </div>
				{/each}
			</div>
            <Tooltip>Interruptions</Tooltip>
		</div>
	</td>
</tr>
