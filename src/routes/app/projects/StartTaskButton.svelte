<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { session, sessionFocus, startSession } from '../session/stores';
	import { canHover } from '../stores';

	export let task: Task;

	const handleClick: SubmitFunction = async ({ formData }) => {
		const start = Date.now();
		startSession(0, start, true);
		sessionFocus.set('task', task.id, task.project_id);
		formData.append('start', new Date(start).toISOString());
		formData.append('focus_type', 'task');
		formData.append('focus_id', String(task.id));
		formData.append('project_id', String(task.project_id));
		await goto('/app/session');
		return async ({ update }) => {
			update();
		};
	};
</script>

{#if !$session.running}
	<form method="POST" action="/app/session?/start" use:enhance={handleClick}>
		<Button size="xs" buttonStyle="menu" type="submit"><i class="fa-solid fa-clock" /></Button>
		{#if $canHover}
			<Tooltip placement="left">Start task session</Tooltip>
		{/if}
	</form>
{/if}
