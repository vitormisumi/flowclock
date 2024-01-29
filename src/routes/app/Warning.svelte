<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { session, sessionBreak, sessionInterruptions } from './session/stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';

	const settings: Writable<Settings> = getContext('settings');

	let open = false;
	$: if ($session.warning && !$session.dismiss) {
		open = true;
	}

	function dismiss() {
		session.dismiss();
		open = false;
	}

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		const end = Date.now();
		session.end(end);
		sessionBreak.start(
			Math.round((end - $session.start - $sessionInterruptions.duration) / $settings.ratio)
		);
		sessionInterruptions.reset();
		formData.append('id', String($session.id));
		formData.append('end', new Date(end).toISOString());
		open = false
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Modal bind:open size="xs">
	<i class="fa-solid fa-warning text-3xl dark:text-secondary-300" />
	<p class="dark:text-secondary-200">
		You have reached your session length warning.<br />How about taking a break?
	</p>
	<div class="flex justify-evenly">
		<form method="POST" action="/app/session?/break" use:enhance={handleClick}>
			<Button size="sm" buttonStyle="accent" type="submit" disabled={loading}>
				<i class="fa-solid fa-stop pr-2" />Break
			</Button>
		</form>
		<Button size="sm" on:click={dismiss}><i class="fa-solid fa-x pr-2" />Dismiss</Button>
	</div>
</Modal>
