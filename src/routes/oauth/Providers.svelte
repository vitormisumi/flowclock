<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	const providers = [
		{
			name: 'facebook',
			icon: 'fa-facebook'
		},
		{
			name: 'github',
			icon: 'fa-github'
		},
		{
			name: 'google',
			icon: 'fa-google'
		}
	];
</script>

<div class="grid gap-4">
	{#each providers as provider}
		<form method="POST" action="/oauth" use:enhance>
			<input type="hidden" name="provider" value={provider.name} />
			<Button outline class="bg-secondary-50 w-full capitalize" type="submit"
				><i class="fa-brands {provider.icon} pr-2" />{provider.name}</Button
			>
		</form>
	{/each}
</div>
