<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte';
	import { distractionLength, session, sessionBreak, distractions } from './session/stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { Settings } from './settings/types';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	let open = false;
	$: if ($session.warning) {
		open = true;
	}
</script>

<Modal
	bind:open
	class="bg-secondary-900 text-center text-xl text-secondary-200 landscape:left-8 landscape:md:left-12"
	size="sm"
>
	<i class="fa-solid fa-warning" />
	<p>
		You have reached your session length warning.<br />How about taking a break?
	</p>
	<div class="flex justify-evenly">
		<form
			method="POST"
			action="/app/session"
			use:enhance={({ formData }) => {
				session.end();
				sessionBreak.start(($session.end - $session.start - $distractionLength) / $settings.ratio);
				formData.append('session_start', new Date($session.start).toISOString());
				formData.append('session_end', new Date($session.end).toISOString());
				formData.append('distractions', JSON.stringify($distractions));
			}}
		>
			<Button
				size="sm"
				class="w-28 bg-secondary-50 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-200"
				type="submit"
				on:click={() => (open = false)}><i class="fa-solid fa-stop pr-4" />Break</Button
			>
		</form>
		<Button
			size="sm"
			class="w-28 border border-secondary-200 bg-transparent text-secondary-200"
			on:click={() => (open = false)}><i class="fa-solid fa-x pr-4" />Dismiss</Button
		>
	</div>
</Modal>
