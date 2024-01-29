<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';

	const providers = [
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

<div class="grid gap-4 w-full">
	{#each providers as provider}
		<form method="POST" action="/oauth" use:enhance>
			<input type="hidden" name="provider" value={provider.name} />
			<Button outline class="w-full bg-secondary-50 capitalize" type="submit"
				><i class="fa-brands {provider.icon} pr-2" />{provider.name}</Button
			>
		</form>
	{/each}
</div>
