<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Card, Input, Label } from 'flowbite-svelte';
	import Notification from '../../Notification.svelte';

	export let form;

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Card>
	<form class="flex flex-col gap-4" method="POST" use:enhance={handleClick}>
		<div>
			<Label for="new_password">New password</Label>
			<Input type="password" name="new_password" />
		</div>
		<div>
			<Label for="new_password2">Confirm your new password</Label>
			<Input type="password" name="new_password2" />
		</div>
		<Button type="submit">Confirm</Button>
	</form>
</Card>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
