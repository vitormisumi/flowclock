<script lang="ts">
	import { slide } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import SessionCard from './SessionCard.svelte';
	import TableCard from './TableCard.svelte';
	import { session, startInterruption, startSession } from './stores';

	export let data;

	export let form;

	$: console.log($session);

	$: if (form?.startData) {
		startSession(form.startData.id, Date.parse(form.startData.start), true);
	}

	// $: if (form?.interruptionData) {
	// 	startInterruption(form.interruptionData.id, Date.parse(form.interruptionData.start));
	// }
</script>

<div
	class="flex h-full w-full flex-col items-center text-center font-light dark:text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid w-full max-w-lg gap-1 md:gap-4 portrait:gap-2">
		{#if data.settings && data.tasks && data.intentions && data.sessions && data.breaks}
			<SessionCard
				settings={data.settings}
				tasks={data.tasks}
				intentions={data.intentions}
				sessions={data.sessions}
				breaks={data.breaks}
			/>
		{/if}
		{#if !$session.running}
			<div transition:slide={{ delay: 500 }}>
				{#if data.sessions && data.interruptions && data.settings && data.tasks}
					<TableCard
						sessions={data.sessions}
						interruptions={data.interruptions}
						settings={data.settings}
						tasks={data.tasks}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
