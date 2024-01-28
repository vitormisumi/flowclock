<script lang="ts">
	import { Card, Popover } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import IntentionsList from './IntentionsList.svelte';
	import AddIntentionButton from './AddIntentionButton.svelte';
	import IntentionsMenu from './IntentionsMenu.svelte';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	let open = false;

	let hidden = $settings.tasks_card_hidden;
</script>

<Card
	class="grid h-full min-h-full min-w-full place-items-center content-start gap-1 border-0 bg-secondary-100 dark:bg-secondary-800"
>
	<div class="flex w-full justify-between">
		<div class="flex h-7 w-full items-center">
			<h2 class="pr-1 font-bold text-primary-900 dark:text-primary-50">Intentions</h2>
			<i class="fa-regular fa-circle-question dark:text-secondary-500" id="hover-3" />
		</div>
		<Popover triggeredBy="#hover-3" class="z-10 w-60 md:w-80" placement="bottom-start">
			<div class="p-2 text-sm">
				<h3 class="font-semibold dark:text-secondary-900">Lifetime Goals</h3>
				Intentions are your tool for continuous self-improvement and long-term objectives. Just like
				Tasks, you can track the time you invest in each Intention, helping you measure your progress
				over time, but what sets them apart is that Intentions don't have a specific due date. They're
				perfect for lifelong pursuits like learning a new language or mastering a musical instrument.
			</div>
		</Popover>
		<IntentionsMenu bind:hidden bind:open />
	</div>
	{#if !hidden}
		<div class="w-full" transition:slide>
			<div class="grid place-items-center">
				<IntentionsList />
				<AddIntentionButton />
			</div>
		</div>
	{/if}
</Card>
