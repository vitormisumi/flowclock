<script lang="ts">
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import Avatar from './Avatar.svelte';
	import { writable } from 'svelte/store';

	export let data;

	let email = writable(data.session.user.email)
	let ratio = writable(data.settings.ratio)
	let max_length = writable(data.settings.max_length)

	setContext('user', {
		email: $email,
		settings: {
			ratio: $ratio,
			max_length: $max_length
		}
	})
</script>

<slot />
<Avatar />
<Menu />
