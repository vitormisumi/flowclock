<script lang="ts">
	import { Label, Popover, Toggle } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import DarkMode from './DarkMode.svelte';
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

	let darkMode: boolean = $settings.dark_mode;

	let clockFormat: boolean = $settings.twenty_four_hour_clock;

	let loading = false;
</script>

<form class="grid gap-8 md:gap-12" method="POST">
	<div class="relative">
		<Label class="text-md w-full text-secondary-900 dark:text-secondary-50">
			Session duration : break duration
			<Select name="ratio" underline items={ratios} value={$settings.ratio} />
		</Label>
		<i
			class="fa-regular fa-circle-question absolute right-0 top-0 dark:text-secondary-500"
			id="hover-1"
		/>
	</div>
	<Popover triggeredBy="#hover-1" class="z-10 w-60 md:w-80" placement="bottom-start">
		<div class="p-2 text-sm">
			<h3 class="font-semibold dark:text-secondary-900">Ratio used to calculate break duration</h3>
			E.g. Your focused session lasts 60 minutes. If you choose a ratio of 2:1, your break duration will
			be 30 minutes, if you choose 3:1, it'll be 20 minutes. We recommend a value between 2:1 and 5:1.
		</div>
	</Popover>
	<div class="relative">
		<Toggle
			size="small"
			bind:checked={warning}
			class="text-md text-secondary-900 dark:text-secondary-50"
		>
			Session length warning (min)
		</Toggle>
		<input
			type="number"
			name="warning"
			min="1"
			max="720"
			value={$settings.warning}
			class="peer w-full appearance-none border-0 border-b-2 border-secondary-100 bg-transparent pl-0 font-thin focus:border-primary-500 focus:outline-none focus:ring-0 dark:border-secondary-700 dark:bg-transparent dark:text-secondary-50 focus:dark:border-primary-500"
			disabled={!warning}
		/>
		<i
			class="fa-regular fa-circle-question absolute right-0 top-0 dark:text-secondary-500"
			id="hover-2"
		/>
		<Popover triggeredBy="#hover-2" class="z-10 w-60 md:w-80" placement="bottom-start">
			<div class="p-2 text-sm">
				<h3 class="font-semibold dark:text-secondary-900">
					Sound warning after a specific session length
				</h3>
				Sitting down for long periods of time is not good for your body, so it is a good idea to set
				a warning after a specific session duration. When your session has reached the specified length
				we'll give you a sound warning so you can remember to start your break and move your body. We
				recommend a value between 45 and 90 minutes.
			</div>
		</Popover>
	</div>
	<div class="relative">
		<Label class="text-md w-full text-secondary-900 dark:text-secondary-50"
			>Break message
			<input
				type="text"
				name="break_message"
				value={$settings.break_message}
				class="peer w-full appearance-none border-0 border-b-2 border-secondary-100 bg-transparent pl-0 font-thin focus:border-primary-500 focus:outline-none focus:ring-0 dark:border-secondary-700 dark:bg-transparent dark:text-secondary-50 focus:dark:border-primary-500"
			/>
		</Label>
		<i
			class="fa-regular fa-circle-question absolute right-0 top-0 dark:text-secondary-500"
			id="hover-3"
		/>
		<Popover triggeredBy="#hover-3" class="z-10 w-60 md:w-80" placement="bottom-start">
			<div class="p-2 text-sm">
				The message that appears while you are on a break. You can use this to remind yourself of
				how you want to spend your break time.
			</div>
		</Popover>
	</div>
	<hr class="my-2 dark:border-secondary-100 dark:dark:border-secondary-800" />
	<DarkMode bind:darkMode />
	<div class="flex gap-4">
		<Label class="text-md w-full text-secondary-900 dark:text-secondary-50"
			>Date format
			<Select name="date_format" underline items={formats} value={$settings.date_format} />
		</Label>
		<Label class="text-md text-secondary-900 dark:text-secondary-50"
			>Separator
			<Select name="separator" underline items={separators} value={$settings.separator} />
		</Label>
	</div>
	<Toggle
		size="small"
		bind:checked={clockFormat}
		class="text-md text-secondary-900 dark:text-secondary-50"
	>
		24-hour clock
	</Toggle>
	<input type="number" name="clock_format" value={clockFormat ? 1 : 0} hidden />
	<Button buttonStyle="accent" type="submit" class="flex items-center gap-2" disabled={loading}>
		<iconify-icon icon="ion:save" />Save changes
	</Button>
</form>
