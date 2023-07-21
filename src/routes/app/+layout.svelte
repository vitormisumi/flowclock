<script lang="ts">
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import Avatar from './Avatar.svelte';

	export let data;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	setContext('user', {
		email: session.user.email
	})
</script>

<slot />
<Avatar />
<Menu />
