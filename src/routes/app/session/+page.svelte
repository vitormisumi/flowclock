<script lang="ts">
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Distractions from './Distractions.svelte';
	import Notification from '../../Notification.svelte';
	import { Card } from 'flowbite-svelte';

	export let form;
</script>

<div
	class="grid h-full w-full content-end justify-items-center text-center font-light text-secondary-100 md:text-xl lg:text-2xl"
>
	<Card class="max-w-lg w-full border-0 bg-primary-800">
		<Message />
		<SessionButton />
		<Distractions />
	</Card>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
