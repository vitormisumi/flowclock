<script lang="ts">
	import { Button, Label, Select, Popover, Card } from 'flowbite-svelte';
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
	class="bg-secondary-900 h-screen grid justify-center content-center pt-8 px-8 pb-20 sm:pb-24 lg:pb-0"
>
	<Label class="text-secondary-50"
		>Session duration : break duration <i class="fa-regular fa-circle-question" id="hover-1" />
		<Popover triggeredBy="#hover-1" class="w-80" placement="bottom-start">
			<div class="p-3 space-y-2">
				<h3 class="font-semibold text-gray-900 dark:text-white">
					Ratio used to calculate break duration.
				</h3>
				E.g. Your focused session lasts 60 minutes. If you choose a ratio of 2:1, your break duration
				will be 30 minutes, if you choose 3:1, it'll be 20 minutes. We recommend a value between 3:1
				and 5:1.
			</div>
		</Popover>
		<Select
			underline
			placeholder="Choose a ratio"
			class="mb-16 text-secondary-100 border-secondary-300 dark:border-secondary-700 focus:border-secondary-100"
			items={ratios}
			bind:value={$ratio}
		/>
	</Label>
	<Label class="text-secondary-50"
		>Maximum focused session length (min) <i class="fa-regular fa-circle-question" id="hover-2" />
		<input
			type="number"
			min="0"
			bind:value={$maxSessionLength}
			class="text-sm pl-0 block w-full mb-16 text-secondary-100 bg-transparent border-0 border-b-2 border-secondary-300 appearance-none dark:text-secondary-100 dark:border-secondary-700 focus:outline-none focus:ring-0 focus:border-secondary-100 peer"
		/>
	</Label>
	<Popover triggeredBy="#hover-2" class="w-80" placement="bottom-start">
		<div class="p-3 space-y-2 text-sm">
			<h3 class="font-semibold text-gray-900 dark:text-white">Limit of time a session can last.</h3>
			Sitting down for long periods of time is not good for your body, so it is a good idea to set a
			limit for the duration of your sessions. When you reach the limit we'll give you a sound warning
			so you can start your break and move your body. We recommend a value between 30 and 60 minutes.
			A value of 0 means no maximum length.
		</div>
	</Popover>
	<Button class="bg-primary-600 hover:bg-primary-700"
		><i class="fa-solid fa-floppy-disk pr-2" />Save changes</Button
	>
</div>
