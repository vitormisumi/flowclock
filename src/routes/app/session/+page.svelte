<script lang="ts">
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import Notification from '../../Notification.svelte';

	export let form;
</script>

<div
	class="grid gap-4 justify-items-center content-end p-4 text-center text-secondary-100 w-full md:text-xl lg:text-2xl font-light h-full"
>
	<Message />
	<SessionButton />
	<DistractionButton />
</div>

{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
