<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import { session } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	$: minutes = Math.floor((Date.now() - $session.start) / 60000 / $settings.ratio);
</script>

<div class="grid justify-items-center text-secondary-50 drop-shadow-xl shadow-orange-500">
	<p class="text-sm md:text-md text-secondary-100">
		You have earned {minutes}
		{minutes > 1 ? 'minutes' : 'minute'} of break
	</p>
</div>
