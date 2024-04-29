<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { User } from '@supabase/supabase-js';
	import { Label, Textarea } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const user: User = getContext('user');

	let selectedSubject: string;

	let subjects = [
		{
			value: 'account',
			name: 'Account'
		},
		{
			value: 'feature',
			name: 'Feature Request'
		},
		{
			value: 'feedback',
			name: 'Feedback'
		},
		{
			value: 'problem',
			name: 'Problem'
		}
	];
</script>

<div class="flex justify-center">
	<div
		class="grid w-full max-w-xl gap-4 md:gap-8"
		in:fade={$navigating?.from?.url.pathname === '/app/session'
			? { duration: 500, delay: 500 }
			: { duration: 0 }}
	>
		<h1 class="text-center text-xl font-bold text-secondary-900 dark:text-secondary-50">Contact</h1>
		<form
			action="https://formsubmit.co/a6a9f6f60a30300e58d39ed98bb18025"
			method="POST"
			class="grid gap-4 md:gap-8"
		>
			<input type="email" name="email" value={user.email} required hidden />
			<div>
				<Label
					for="_subject"
					class="text-md text-prisecondarymary-900 mb-2 font-medium dark:text-secondary-50"
				>
					Subject
				</Label>
				<Select
					name="_subject"
					placeholder="Select the subject of your message"
					underline
					items={subjects}
					bind:value={selectedSubject}
					required
				></Select>
			</div>
			<div>
				<Label
					for="message"
					class="text-md mb-2 font-medium text-secondary-900 dark:text-secondary-50"
				>
					Message
				</Label>
				<Textarea
					name="message"
					placeholder="Type your message"
					rows="4"
					class="rounded-none border-0 border-b-2 border-secondary-100 bg-transparent font-thin text-secondary-900 focus:ring-0 dark:bg-transparent dark:text-secondary-50"
					required
				/>
			</div>
			<input type="hidden" name="_captcha" value="false" />
			<input type="text" name="_honey" style="display:none" />
			<input type="hidden" name="_next" value={$page.url + '/thanks'} />
			<Button buttonStyle="accent" type="submit" class="flex items-center gap-2">
				<iconify-icon icon="ion:mail" />Send
			</Button>
		</form>
	</div>
</div>
