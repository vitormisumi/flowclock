<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { timeFromTimestamp } from '$lib/functions/functions';
	import { slide } from 'svelte/transition';
	import { filteredInterruptions } from '../dashboard/stores';
	import { canHover } from '../stores';
	import EditSessionEnd from './EditSessionEnd.svelte';
	import EditSessionStart from './EditSessionStart.svelte';

	export let settings: Settings;
	export let tasks: Task[];
	export let session: Session;
</script>

<tr class="border-b dark:border-secondary-800">
	<td colspan="2" class="bg-secondary-50 p-0 dark:bg-secondary-900">
		<div
			class="grid grid-cols-2 place-items-center justify-evenly p-2 font-light text-secondary-700 dark:text-secondary-200"
			transition:slide
		>
			<p class="col-span-2 flex items-center gap-1">
				<iconify-icon icon="material-symbols:target" />{tasks.find((x) => x.id === session.task_id)
					?.name ?? 'No focus'}
			</p>
			{#if $canHover}
				<Tooltip>Session focus</Tooltip>
			{/if}
			<EditSessionStart {session} />
			<EditSessionEnd {session} />
			<div class="col-span-2 col-start-1 row-start-3 grid justify-items-start">
				{#each Object.entries($filteredInterruptions.filter((x) => x.session_id === session.id)) as interruption}
					<div
						class="flex items-center justify-center gap-1 font-extralight dark:text-secondary-100"
					>
						<iconify-icon icon="ion:pause" />
						<p>
							{timeFromTimestamp(interruption[1].start, settings.twenty_four_hour_clock)} -&nbsp
						</p>
						<p>{timeFromTimestamp(interruption[1].end, settings.twenty_four_hour_clock)}</p>
						{#if interruption[1].reason}
							<p class="pl-1">({interruption[1].reason})</p>
						{/if}
					</div>
				{/each}
			</div>
			{#if $canHover}
				<Tooltip>Interruptions</Tooltip>
			{/if}
		</div>
	</td>
</tr>
