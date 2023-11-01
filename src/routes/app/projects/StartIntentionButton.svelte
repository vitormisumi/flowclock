<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { session, sessionBreak } from '../session/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let intention: Intention;

	const handleClick: SubmitFunction = ({ formData }) => {
		goto('/app/session');
		const start = Date.now();
		sessionBreak.end();
		session.start(0, start);
		formData.append('start', new Date(start).toISOString());
		formData.append('focus_type', 'intention');
		formData.append('focus_id', String(intention.id));
		return async ({ update }) => {
			update();
		};
	};
</script>

<form method="POST" action="/app/session?/start" use:enhance={handleClick}>
	<Button
		type="submit"
		size="xs"
		class="bg-transparent transition-colors hover:bg-primary-700"
		on:click={() => session.start()}
	>
		<i class="fa-solid fa-clock text-primary-50" />
	</Button>
	<Tooltip placement="left">Start intention session</Tooltip>
</form>
