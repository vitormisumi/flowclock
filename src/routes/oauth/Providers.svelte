<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';

	const providers = [
		{
			name: 'github',
			icon: 'ion:logo-github'
		},
		{
			name: 'google',
			icon: 'ion:logo-google'
		}
	];
</script>

<div class="grid w-full gap-4">
	{#each providers as provider}
		<form method="POST" action="/oauth" use:enhance>
			<input type="hidden" name="provider" value={provider.name} />
			<Button outline class="w-full capitalize flex items-center gap-2" type="submit">
				<iconify-icon icon={provider.icon} />{provider.name}
			</Button>
		</form>
	{/each}
</div>
