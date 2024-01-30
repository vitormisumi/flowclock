<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { session, sessionBreak } from '../session/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
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
		<Button size="xs" buttonStyle="menu" type="submit"><i class="fa-solid fa-clock" /></Button>
		{#if $windowWidth >= 768}
			<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">
				Start intention session
			</Tooltip>
		{/if}
	</form>
{/if}
