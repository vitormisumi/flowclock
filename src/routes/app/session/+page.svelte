<script lang="ts">
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Distractions from './Distractions.svelte';
	import Notification from '../../Notification.svelte';

	export let form;
</script>

<div
	class="grid h-full w-full content-end justify-items-center text-center font-light text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid gap-2 rounded-xl bg-primary-800 md:gap-4 lg:gap-8 w-full max-w-xl p-2 md:p-4 lg:p-8 justify-items-center">
		<Message />
		<SessionButton />
		<Distractions />
	</div>
</div>

{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
