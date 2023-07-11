<script lang="ts">
	import { Button, Label, Select, Tooltip } from 'flowbite-svelte';
	import { ratio, maxSessionLength } from './stores';

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
</script>

<div
	class="bg-gradient-radial from-primary-800 to-secondary-900 h-screen grid justify-center content-start pt-8 px-8 pb-20 sm:pb-24 lg:pb-0"
>
	<Label class="text-secondary-50"
		>Session duration : break duration <i
			class="fa-regular fa-circle-question"
			id="hover-1"
		/><Tooltip triggeredBy="#hover-1" placement="bottom"
			>Ratio used to calculate break duration.<br /><br />E.g. Your focused session lasts 60
			minutes.<br />If you choose a ratio of 2:1, your break duration will be 30 minutes,<br />if
			you choose 3:1, it'll be 20 minutes.<br />We recommend a value between 3:1 and 5:1.</Tooltip
		>
		<Select
			underline
			placeholder="Choose a ratio"
			class="mb-16 text-secondary-100"
			items={ratios}
			bind:value={$ratio}
		/>
	</Label>
	<Label class="text-secondary-50"
		>Maximum focused session length (min) <i
			class="fa-regular fa-circle-question"
			id="hover-2"
		/><Tooltip triggeredBy="#hover-2" placement="bottom"
			>Sitting down for long periods of time is not good for your body.<br />Setting a limit for the
			duration of your sessions can help with that.<br />When you reach the limit we'll give you a
			sound warning<br />so you can start your break and move your body.<br />We recommend a value
			between 30 and 60 minutes.<br />A value of 0 means no maximum length.</Tooltip
		>
		<input
			type="number"
			min="0"
			bind:value={$maxSessionLength}
			class="block w-full mb-16 text-secondary-100 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-secondary-100 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
		/>
	</Label>
	<Button><i class="fa-solid fa-floppy-disk pr-2"></i>Save changes</Button>
</div>
