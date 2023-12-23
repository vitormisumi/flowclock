<script lang="ts">
	import { Card, Popover } from 'flowbite-svelte';
	import IntentionsList from './IntentionsList.svelte';
	import AddIntentionButton from './AddIntentionButton.svelte';
</script>

<Card class="h-full min-w-full border-0 bg-primary-800 gap-1">
	<div class="flex items-center h-7">
		<h2 class="pr-1 font-bold text-primary-50">Intentions</h2>
		<i class="fa-regular fa-circle-question text-secondary-500" id="hover-3" />
	</div>
	<Popover triggeredBy="#hover-3" class="z-10 w-60 md:w-80" placement="bottom-start">
		<div class="p-2 text-sm">
			<h3 class="font-semibold text-secondary-900">Lifetime Goals</h3>
			Intentions are your tool for continuous self-improvement and long-term objectives. Just like Tasks,
			you can track the time you invest in each Intention, helping you measure your progress over time,
			but what sets them apart is that Intentions don't have a specific due date. They're perfect for
			lifelong pursuits like learning a new language or mastering a musical instrument.
		</div>
	</Popover>
	<IntentionsList />
	<AddIntentionButton />
</Card>
