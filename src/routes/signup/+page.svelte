<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" value={form?.email ?? ''}>
	<label for="password">Password</label>
	<input type="password" name="password" />
	<button>Sign up</button>
</form>

{#if form?.message}
	{form.message}
{/if}
