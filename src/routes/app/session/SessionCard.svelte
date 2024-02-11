<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import FocusSelect from './FocusSelect.svelte';
	import Interruptions from './Interruptions.svelte';
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import { session } from './stores';
	import Clock from '../Clock.svelte';
</script>

<Card class="grid h-full min-w-full gap-2 md:gap-4 border-0 bg-secondary-100 dark:bg-secondary-800">
    <Clock />
	<Message />
	{#if $session.running}
		<Interruptions />
	{:else}
		<FocusSelect />
	{/if}
	<SessionButton />
</Card>
