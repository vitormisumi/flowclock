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
			action="https://formsubmit.co/ee041d27aae0edef210e8ff6571fdf22"
			method="POST"
			class="grid gap-4 md:gap-8"
		>
			<input type="email" name="email" value={user.email} required hidden />
			<div>
				<Label for="_subject" class="mb-2 text-primary-50 font-medium text-md">Subject</Label>
				<Select
					name="_subject"
					placeholder="Select the subject of your message"
					items={subjects}
					bind:value={selectedSubject}
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					required
				></Select>
			</div>
			<div>
				<Label for="message" class="mb-2 text-primary-50 font-medium text-md">Message</Label>
				<Textarea
					name="message"
					placeholder="Type your message"
					rows="4"
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					required
				/>
			</div>
			<input type="hidden" name="_captcha" value="false" />
			<input type="text" name="_honey" style="display:none" />
			<input type="hidden" name="_next" value={$page.url + '/thanks'}>
			<Button type="submit"><i class="fa-solid fa-envelope pr-2" />Send</Button>
		</form>
	</div>
</div>
