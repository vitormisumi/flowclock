<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from './stores';

	let date: Date = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="grid justify-items-center text-white drop-shadow-xl shadow-orange-500">
	<div class="flex justify-center">
		{#key date}
			<p class="flex justify-center text-6xl sm:text-9xl w-24 m-4">
				<span>{date.getHours() > 9 ? String(date.getHours()) : "0" + String(date.getHours())}</span>:
				<span>{date.getMinutes() > 9 ? String(date.getMinutes()) : "0" + String(date.getMinutes())}</span>:
				<span>{date.getSeconds() > 9 ? String(date.getSeconds()) : "0" + String(date.getSeconds())}</span>
			</p>
		{/key}
	</div>
	<p class="text-xs text-secondary-100">You've already earned 8 minutes of break</p>
</div>
