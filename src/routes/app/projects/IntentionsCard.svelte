<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import AddIntentionButton from './AddIntentionButton.svelte';
	import IntentionsList from './IntentionsList.svelte';
	import IntentionsMenu from './IntentionsMenu.svelte';

	let open = false;
</script>

<Card
	class="grid h-full min-h-full min-w-full place-items-center content-start gap-1 border-0 bg-secondary-100 dark:bg-secondary-800"
>
	<div class="flex w-full justify-between">
		<h2 class="pr-1 font-bold text-primary-900 dark:text-primary-50">Intentions</h2>
		<IntentionsMenu bind:open />
	</div>
	<div class="grid w-full place-items-center">
		<IntentionsList />
		<AddIntentionButton />
	</div>
</Card>
