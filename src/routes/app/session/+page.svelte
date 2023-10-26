<script lang="ts">
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Interruptions from './Interruptions.svelte';
	import Notification from '../../Notification.svelte';
	import { session } from './stores';

	export let form;
	
	$: if (form?.data) {
		session.id(form.data.id)
	}
</script>

<div
	class="grid h-full w-full content-end justify-items-center text-center font-light text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid gap-2 md:gap-4 lg:gap-8">
		<Message />
		<SessionButton />
		<Interruptions />
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
