<script lang="ts">
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Menu from './Menu.svelte';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
<Menu />
