<script lang="ts">
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Distractions from './Distractions.svelte';
	import Notification from '../../Notification.svelte';

	export let form;
</script>

<div
	class="grid h-full w-full content-end justify-items-center gap-2 p-4 text-center font-light text-secondary-100 md:gap-4 md:text-xl lg:gap-8 lg:text-2xl"
>
	<Message />
	<SessionButton />
	<Distractions />
</div>

{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
