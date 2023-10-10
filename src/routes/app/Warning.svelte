<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte';
	import { interruptionLength, session, sessionBreak, interruptions } from './session/stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { Settings } from './types';
	import { getContext } from 'svelte';
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
		session.end();
		sessionBreak.start(($session.end - $session.start - $interruptionLength) / $settings.ratio);
		formData.append('session_start', new Date($session.start).toISOString());
		formData.append('session_end', new Date($session.end).toISOString());
		formData.append('interruptions', JSON.stringify($interruptions));
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Modal
	bind:open
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
	size="xs"
>
	<i class="fa-solid fa-warning text-3xl text-secondary-300" />
	<p class="text-secondary-200">
		You have reached your session length warning.<br />How about taking a break?
	</p>
	<div class="flex justify-evenly">
		<form method="POST" action="/app/session" use:enhance={handleClick}>
			<Button
				size="sm"
				class="w-28 bg-secondary-50 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-200"
				type="submit"
				disabled={loading}><i class="fa-solid fa-stop pr-2" />Break</Button
			>
		</form>
		<Button
			size="sm"
			class="w-28 border border-secondary-200 bg-transparent text-secondary-200"
			on:click={dismiss}><i class="fa-solid fa-x pr-2" />Dismiss</Button
		>
	</div>
</Modal>
