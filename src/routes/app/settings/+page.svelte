<script lang="ts">
	import { Button, Label, Select, Popover, Toggle } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { Settings } from '../types';
	import type { Writable } from 'svelte/store';
	import Notification from '../../Notification.svelte';
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

	let formats = [
		{ value: 'ddmmyyyy', name: 'DDMMYYYY' },
		{ value: 'mmddyyyy', name: 'MMDDYYYY' },
		{ value: 'yyyymmdd', name: 'YYYYMMDD' },
		{ value: 'ddmmyy', name: 'DDMMYY' },
		{ value: 'mmddyy', name: 'MMDDYY' },
		{ value: 'yymmdd', name: 'YYMMDD' }
	];

	let separators = [
		{ value: 0, name: '/' },
		{ value: 1, name: '-' },
		{ value: 2, name: '.' }
	];

	const settings: Writable<Settings> = getContext('settings');

	let warning: boolean = $settings.warning != 0 ? true : false;

	let clockFormat: boolean = $settings.clock_format ? true : false;

	let loading: boolean = false;

	const handleSave: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="flex justify-center">
	<div
		class="grid w-full max-w-xl gap-4 md:gap-8"
		in:fade={$navigating?.from?.url.pathname === '/app/session'
			? { duration: 500, delay: 500 }
			: { duration: 0 }}
	>
		<h1 class="text-center text-xl font-bold text-primary-600">Settings</h1>
		<form class="grid gap-8 md:gap-12" method="POST" use:enhance={handleSave}>
			<Label class="text-md text-primary-50"
				>Session duration : break duration <i class="fa-regular fa-circle-question" id="hover-1" />
				<Popover triggeredBy="#hover-1" class="w-80" placement="bottom-start">
					<div class="space-y-2 p-3 text-sm">
						<h3 class="font-semibold text-gray-900 dark:text-white">
							Ratio used to calculate break duration
						</h3>
						E.g. Your focused session lasts 60 minutes. If you choose a ratio of 2:1, your break duration
						will be 30 minutes, if you choose 3:1, it'll be 20 minutes. We recommend a value between
						2:1 and 5:1.
					</div>
				</Popover>
				{#key $settings}
					<Select
						underline
						name="ratio"
						class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
						items={ratios}
						value={$settings.ratio}
					/>
				{/key}
			</Label>
			<div>
				{#key loading}
					<Toggle bind:checked={warning} class="text-md text-primary-50"
						>Session length warning (min)&nbsp; <i
							class="fa-regular fa-circle-question"
							id="hover-2"
						/></Toggle
					>
				{/key}
				<Popover triggeredBy="#hover-2" class="w-80" placement="bottom-start">
					<div class="space-y-2 p-3 text-sm">
						<h3 class="font-semibold text-gray-900 dark:text-white">
							Sound warning after a specific session length
						</h3>
						Sitting down for long periods of time is not good for your body, so it is a good idea to
						set a warning after a specific session duration. When your session has reached the specified
						length we'll give you a sound warning so you can remember to start your break and move your
						body. We recommend a value between 45 and 90 minutes.
					</div>
				</Popover>
				{#key $settings}
					<input
						type="number"
						name="warning"
						min="1"
						value={$settings.warning}
						class="peer block w-full appearance-none border-0 border-b-2 border-secondary-300 bg-transparent pl-0 text-sm text-primary-50 focus:border-secondary-100 focus:outline-none focus:ring-0 disabled:border-secondary-800 disabled:text-secondary-800"
						disabled={!warning}
					/>
				{/key}
			</div>
			<hr class="my-4 border-secondary-800" />
			<div class="flex gap-4">
				<Label class="text-md w-full text-primary-50"
					>Date format
					{#key $settings}
						<Select
							underline
							name="date_format"
							class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
							items={formats}
							value={$settings.date_format}
						/>
					{/key}
				</Label>
				<Label class="text-md text-primary-50"
					>Separator
					{#key $settings}
						<Select
							underline
							name="separator"
							class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
							items={separators}
							value={$settings.separator}
						/>
					{/key}
				</Label>
			</div>
			{#key $settings}
				<Toggle bind:checked={clockFormat} class="text-md text-primary-50">24-hour clock</Toggle>
				<input type="number" name="clock_format" value={clockFormat ? 1 : 0} hidden />
			{/key}
			<Button type="submit" disabled={loading}
				><i class="fa-solid fa-floppy-disk pr-2" />Save changes</Button
			>
		</form>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
