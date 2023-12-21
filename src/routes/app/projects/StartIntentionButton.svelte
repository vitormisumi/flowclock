<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { session, sessionBreak } from '../session/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let intention: Intention;

	const handleClick: SubmitFunction = async ({ formData }) => {
		const start = Date.now();
		sessionBreak.end();
		session.start(0, start);
		formData.append('start', new Date(start).toISOString());
		formData.append('focus_type', 'intention');
		formData.append('focus_id', String(intention.id));
		formData.append('project_id', String(intention.project_id));
		await goto('/app/session');
		return ({ update }) => {
			update();
		};
	};
</script>

{#if !$session.running}
	<form method="POST" action="/app/session?/start" use:enhance={handleClick}>
		<Button
			type="submit"
			size="xs"
			class="bg-transparent transition-colors hover:bg-primary-700"
		>
			<i class="fa-solid fa-clock text-primary-50" />
		</Button>
		<Tooltip placement="left">Start intention session</Tooltip>
	</form>
{/if}
