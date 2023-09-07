<script lang="ts">
	import { Button, Label, Select, Popover } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { Settings } from './types.js';
	import type { Writable } from 'svelte/store';
	import Notification from '../../Notification.svelte';
	import { session, sessionBreak } from '../session/stores.js';
	import { navigating } from '$app/stores';

	export let form;

	let ratios = [
		{ value: 1, name: '1:1' },
		{ value: 2, name: '2:1' },
		{ value: 3, name: '3:1' },
		{ value: 4, name: '4:1' },
		{ value: 5, name: '5:1' },
		{ value: 6, name: '6:1' },
		{ value: 7, name: '7:1' },
		{ value: 8, name: '8:1' },
		{ value: 9, name: '9:1' },
		{ value: 10, name: '10:1' }
	];

	const settings: Writable<Settings> = getContext('settings');

	let loading = false;

	const handleSave: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div
	class="p-6 md:p-8 lg:px-40 grid gap-4 md:gap-8"
	in:fade={$navigating?.from?.url.pathname === '/app/session' &&
	($session.running || ($sessionBreak.running && !$sessionBreak.alarmPlayed))
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<h1 class="text-center text-xl text-primary-600 font-bold">Settings</h1>
	<form class="grid gap-8 md:gap-12" method="POST" use:enhance={handleSave}>
		<Label class="text-secondary-50"
			>Session duration : break duration <i class="fa-regular fa-circle-question" id="hover-1" />
			<Popover triggeredBy="#hover-1" class="w-80" placement="bottom-start">
				<div class="p-3 space-y-2">
					<h3 class="font-semibold text-gray-900 dark:text-white">
						Ratio used to calculate break duration.
					</h3>
					E.g. Your focused session lasts 60 minutes. If you choose a ratio of 2:1, your break duration
					will be 30 minutes, if you choose 3:1, it'll be 20 minutes. We recommend a value between 2:1
					and 5:1.
				</div>
			</Popover>
			{#key loading}
				<Select
					underline
					name="ratio"
					class="text-secondary-100 border-secondary-300 dark:border-secondary-700 focus:border-secondary-100"
					items={ratios}
					bind:value={$settings.ratio}
				/>
			{/key}
		</Label>
		<Label class="text-secondary-50"
			>Maximum focused session length (min) <i class="fa-regular fa-circle-question" id="hover-2" />
			{#key loading}
				<input
					type="number"
					name="max_length"
					min="0"
					bind:value={$settings.max_length}
					class="text-sm pl-0 block w-full text-secondary-100 bg-transparent border-0 border-b-2 border-secondary-300 appearance-none dark:text-secondary-100 dark:border-secondary-700 focus:outline-none focus:ring-0 focus:border-secondary-100 peer"
				/>
			{/key}
		</Label>
		<Popover triggeredBy="#hover-2" class="w-80" placement="bottom-start">
			<div class="p-3 space-y-2 text-sm">
				<h3 class="font-semibold text-gray-900 dark:text-white">
					Limit of time a session can last.
				</h3>
				Sitting down for long periods of time is not good for your body, so it is a good idea to set
				a limit for the duration of your sessions. When you reach the limit we'll give you a sound warning
				so you can start your break and move your body. We recommend a value between 30 and 60 minutes.
				A value of 0 means no maximum length.
			</div>
		</Popover>
		<Button type="submit" disabled={loading}
			><i class="fa-solid fa-floppy-disk pr-2" />Save changes</Button
		>
	</form>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
