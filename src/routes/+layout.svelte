<script lang="ts">
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { inject } from '@vercel/analytics';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
