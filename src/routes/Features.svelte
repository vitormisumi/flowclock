<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import features1 from '$lib/assets/features1.png';
	import features2 from '$lib/assets/features2.png';
	import features3 from '$lib/assets/features3.png';
	import { onMount } from 'svelte';

	export let features: HTMLElement;

	const images = [
		{
			title: 'Track all your sessions',
			alt: 'Register your time focused and automatically calculate your break',
			src: features1
		},
		{
			title: 'Organize your projects',
			alt: 'Combine your sessions with your tasks and to-dos',
			src: features2
		},
		{
			title: 'Analyze your time',
			alt: 'Take away insights to improve your next sessions',
			src: features3
		}
	];

	let selected = 0;
	let interval: NodeJS.Timeout;

	function startInterval() {
		if (interval) {
			clearInterval(interval);
		}
		interval = setInterval(() => {
			if (selected === 2) {
				selected = 0;
			} else {
				selected += 1;
			}
		}, 5000);
	}

	let container: HTMLElement;

	function scrollToButton() {
		if (selected === 0) {
			container.scrollTo({
				left: 0,
				behavior: 'smooth'
			});
		} else if (selected === 1) {
			container.scrollTo({
				left: container.scrollWidth / 3,
				behavior: 'smooth'
			});
		} else {
			container.scrollTo({
				left: container.scrollWidth,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		startInterval();
		return () => clearInterval(interval);
	});

	$: if (typeof selected === 'number' && container) {
		scrollToButton();
	}
</script>

<section
	class="flex justify-center bg-secondary-50 px-4 py-20 text-secondary-900 sm:px-8 md:px-12 lg:px-20" bind:this={features}
>
	<div class="grid max-w-4xl gap-4 overflow-hidden">
		<div class="flex gap-4 overflow-scroll" bind:this={container}>
			{#each images as image, i}
				<button
					class="grid w-full min-w-[80%] content-start gap-2 rounded-lg border p-4 text-left sm:min-w-min {selected ===
					i
						? 'border-secondary-100 bg-secondary-50'
						: 'border-transparent bg-secondary-100'}"
					on:mouseover={() => {
						selected = i;
						clearInterval(interval);
					}}
					on:focus={() => {
						selected = i;
						clearInterval(interval);
					}}
					on:mouseleave={startInterval}
					on:blur={startInterval}
				>
					<h2 class="font-bold md:text-lg lg:text-xl">{image.title}</h2>
					<p class="text-sm font-extralight">{image.alt}</p>
				</button>
			{/each}
		</div>
		<img src={images[selected].src} alt={images[selected].alt} class="rounded-lg" />
		<Button
			href="/signup"
			class="w-fit place-self-center bg-accent-500 transition-colors hover:bg-accent-600"
		>
			Get Started
		</Button>
	</div>
</section>
