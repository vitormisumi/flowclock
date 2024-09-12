<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import 'iconify-icon';
	import '../app.postcss';

	inject({ mode: dev ? 'development' : 'production' });

	injectSpeedInsights();
</script>

<slot />
