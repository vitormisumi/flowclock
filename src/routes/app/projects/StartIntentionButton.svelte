<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { session, sessionFocus, startSession } from '../session/stores';
	import { canHover } from '../stores';

	export let intention: Intention;

	const handleClick: SubmitFunction = async ({ formData }) => {
		const start = Date.now();
		startSession(0, start);
		sessionFocus.set('intention', intention.id, intention.project_id);
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
		<Button size="xs" buttonStyle="menu" type="submit"><i class="fa-solid fa-clock" /></Button>
		{#if $canHover}
			<Tooltip placement="left">Start intention session</Tooltip>
		{/if}
	</form>
{/if}
