<script lang="ts">
	import { Button, Label, Select, Popover, Toggle } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Settings } from '../types';
	import type { Writable } from 'svelte/store';

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

	let clockFormat: boolean = $settings.clock_format;

	let loading = false;
</script>

<form class="grid gap-8 md:gap-12" method="POST">
	<div class="relative">
		<Label class="text-md w-full text-primary-50"
			>Session duration : break duration
			<Select
				name="ratio"
				class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
				items={ratios}
				value={$settings.ratio}
			/>
		</Label>
		<i class="fa-regular fa-circle-question absolute right-0 top-0 text-primary-50" id="hover-1" />
	</div>
	<Popover triggeredBy="#hover-1" class="w-60 bg-primary-100 md:w-80 z-10" placement="bottom-start">
		<div class="p-2 text-sm">
			<h3 class="font-semibold text-secondary-900">Ratio used to calculate break duration</h3>
			E.g. Your focused session lasts 60 minutes. If you choose a ratio of 2:1, your break duration will
			be 30 minutes, if you choose 3:1, it'll be 20 minutes. We recommend a value between 2:1 and 5:1.
		</div>
	</Popover>
	<div class="relative">
		<Toggle size="small" bind:checked={warning} class="text-md text-primary-50"
			>Session length warning (min)</Toggle
		>
		<input
			type="number"
			name="warning"
			min="1"
			value={$settings.warning}
			class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-primary-500 w-full"
			disabled={!warning}
		/>
		<i class="fa-regular fa-circle-question absolute top-0 right-0 text-primary-50" id="hover-2" />
		<Popover triggeredBy="#hover-2" class="w-60 bg-primary-100 md:w-80" placement="bottom-start">
			<div class="p-2 text-sm">
				<h3 class="font-semibold text-secondary-900">
					Sound warning after a specific session length
				</h3>
				Sitting down for long periods of time is not good for your body, so it is a good idea to set
				a warning after a specific session duration. When your session has reached the specified length
				we'll give you a sound warning so you can remember to start your break and move your body. We
				recommend a value between 45 and 90 minutes.
			</div>
		</Popover>
	</div>
	<hr class="my-4 border-secondary-800" />
	<div class="flex gap-4">
		<Label class="text-md w-full text-primary-50"
			>Date format
			<Select
				name="date_format"
				class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
				items={formats}
				value={$settings.date_format}
			/>
		</Label>
		<Label class="text-md text-primary-50"
			>Separator
			<Select
				name="separator"
				class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
				items={separators}
				value={$settings.separator}
			/>
		</Label>
	</div>
	<Toggle size="small" bind:checked={clockFormat} class="text-md text-primary-50">24-hour clock</Toggle>
	<input type="number" name="clock_format" value={clockFormat ? 1 : 0} hidden />
	<Button type="submit" disabled={loading}
		><i class="fa-solid fa-floppy-disk pr-2" />Save changes</Button
	>
</form>
