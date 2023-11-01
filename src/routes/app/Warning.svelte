<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte';
	import { session, sessionBreak } from './session/stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const settings: Writable<Settings> = getContext('settings');
	const sessions: Writable<UserSession[]> = getContext('sessions');

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
		sessionBreak.start((Date.now() - Date.parse($sessions[0].start)) / $settings.ratio);
		formData.append('id', String($sessions[0].id));
		formData.append('session_end', new Date().toISOString());
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
				class="w-28 bg-secondary-50 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-200 transition-colors"
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
