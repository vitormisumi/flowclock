<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	let box: HTMLElement;
	let isInView = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isInView = true;
					observer.unobserve(box);
				}
			},
			{ threshold: 0.8 }
		);

		observer.observe(box);

		return () => observer.disconnect();
	});
</script>

<section class="bg-secondary-900" bind:this={box}>
	<div
		class="grid justify-items-center py-32 text-secondary-50 transition-opacity duration-1000 {isInView
			? 'opacity-100'
			: 'opacity-0'}"
	>
		<h2 class="pb-8 text-center text-3xl font-bold">Sign Up Today.</h2>
		<Button href="/signup" buttonStyle="accent">Get Started</Button>
	</div>
</section>
