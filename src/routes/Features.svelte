<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import features1 from '$lib/assets/features1.png';
	import features2 from '$lib/assets/features2.png';
	import features3 from '$lib/assets/features3.png';
	import checkmark from '$lib/assets/checkmark.png';
	import { onMount } from 'svelte';
	import { Image } from '@unpic/svelte';

	export let features: HTMLElement;

	const images = [
		{
			title: 'Track all your sessions',
			description: 'Register your time focused and auto calculate your break',
			src: features1,
			alt: 'Sessions tab of the app'
		},
		{
			title: 'Organize your projects',
			description: 'Combine your sessions with your tasks and to-dos',
			src: features2,
			alt: 'Projects tab of the app'
		},
		{
			title: 'Analyze your time',
			description: 'Take away insights to improve your next sessions',
			src: features3,
			alt: 'Dashboard tab of the app'
		}
	];

	const featureList = [
		'Customizable session : break ratio',
		'Session interruption button',
		'Kanban style drag and drop tasks board',
		'To-dos list with priority level and due date',
		'Session time synchronized across devices',
		'Multiple plots to analyse your sessions',
		'Customizable break message',
		'Multiple projects to organize your tasks'
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
	class="grid justify-center gap-8 bg-secondary-50 px-4 py-20 text-secondary-900 sm:px-8 md:px-12 lg:px-20"
	bind:this={features}
>
	<div class="grid max-w-4xl gap-4 overflow-hidden">
		<div class="flex gap-4 overflow-scroll" bind:this={container}>
			{#each images as image, i}
				<button
					class="grid w-full min-w-[80%] content-start gap-2 rounded-lg border-2 p-4 text-left transition-colors sm:min-w-min {selected ===
					i
						? 'border-primary-100 bg-primary-50 text-primary-800'
						: 'border-transparent bg-secondary-100 text-secondary-900'}"
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
					<p class="font-extralight">{image.description}</p>
				</button>
			{/each}
		</div>
		<Image src={images[selected].src} layout="fullWidth" breakpoints={[300, 600, 900, 1200, 1500, 1800]} alt={images[selected].alt} />
	</div>
	<ul
		class="grid gap-4 rounded-lg border-2 border-primary-100 bg-primary-50 p-4 md:p-8 font-extralight text-primary-800 md:grid-cols-2 md:text-lg"
	>
		{#each featureList as feature, i}
			<li class="flex items-center gap-2">
				<img src={checkmark} alt="list icon" class="h-4 w-4 md:h-6 md:w-6" />{feature}
			</li>
		{/each}
		<p class="md:col-span-2 text-center font-bold">And much more!</p>
	</ul>
	<Button
		size="lg"
		href="/signup"
		class="w-fit place-self-center bg-accent-500 transition-colors hover:bg-accent-600"
	>
		Get Started
	</Button>
</section>
