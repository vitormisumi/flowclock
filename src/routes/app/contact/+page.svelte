<script lang="ts">
	import { fade } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { Button, Label, Select, Textarea } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { User } from '@supabase/supabase-js';

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
		<h1 class="text-center text-xl font-bold text-primary-600">Contact</h1>
		<form
			action="https://formsubmit.co/a6a9f6f60a30300e58d39ed98bb18025"
			method="POST"
			class="grid gap-4 md:gap-8"
		>
			<input type="email" name="email" value={user.email} required hidden />
			<div>
				<Label for="_subject" class="text-md mb-2 font-medium text-primary-50">Subject</Label>
				<Select
					name="_subject"
					placeholder="Select the subject of your message"
					underline
					items={subjects}
					bind:value={selectedSubject}
					class="focus:border-primary-500 bg-transparent {selectedSubject === ''
						? 'text-secondary-500'
						: 'text-secondary-50'}"
					required
				></Select>
			</div>
			<div>
				<Label for="message" class="text-md mb-2 font-medium text-primary-50">Message</Label>
				<Textarea
					name="message"
					placeholder="Type your message"
					rows="4"
					class="border-0 border-b-2 rounded-none focus:ring-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
					required
				/>
			</div>
			<input type="hidden" name="_captcha" value="false" />
			<input type="text" name="_honey" style="display:none" />
			<input type="hidden" name="_next" value={$page.url + '/thanks'} />
			<Button type="submit"><i class="fa-solid fa-envelope pr-2" />Send</Button>
		</form>
	</div>
</div>
