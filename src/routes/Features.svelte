<script lang="ts">
	import checkmark from '$lib/assets/checkmark.png';
	import features1 from '$lib/assets/features1.png';
	import features2 from '$lib/assets/features2.png';
	import features3 from '$lib/assets/features3.png';
	import Button from '$lib/components/Button.svelte';
	import { Image } from '@unpic/svelte';
	import { onMount } from 'svelte';

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

	let box: HTMLDivElement;
	let isInView = false;

	onMount(() => {
		startInterval();
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isInView = true;
					observer.unobserve(box);
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(box);

		return () => {
			clearInterval(interval);
			observer.disconnect;
		};
	});

	$: if (typeof selected === 'number' && container) {
		scrollToButton();
	}
</script>

<section
	class="grid justify-center gap-8 bg-gradient-radial from-primary-800 via-secondary-900 via-70% to-secondary-900 px-4 py-20 text-secondary-50 sm:px-8 md:gap-16 md:px-12 lg:px-20"
	bind:this={features}
>
	<div class="grid max-w-4xl gap-4 overflow-hidden">
		<div class="flex gap-4 overflow-scroll" bind:this={container}>
			{#each images as image, i}
				<button
					class="grid w-full min-w-[80%] content-start gap-2 rounded-lg p-4 text-left transition-colors sm:min-w-min {selected ===
					i
						? 'bg-primary-700'
						: 'bg-secondary-800 opacity-80'}"
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
		<div class="relative overflow-visible">
			<Image
				src={images[selected].src}
				layout="fullWidth"
				breakpoints={[300, 600, 900, 1200, 1500, 1800]}
				alt={images[selected].alt}
			/>
		</div>
	</div>
	<div
		class="grid gap-8 transition-all duration-500 {isInView
			? 'opacity-100'
			: 'translate-y-48 opacity-0'}"
		bind:this={box}
	>
		<ul class="grid gap-4 rounded-lg bg-secondary-800 p-4 font-extralight">
			{#each featureList as feature, i}
				<li class="flex items-center gap-2">
					<img src={checkmark} alt="list icon" class="h-3 w-3" />{feature}
				</li>
			{/each}
			<p class="pt-8 text-center font-bold md:col-span-2">And much more!</p>
		</ul>
		<Button size="lg" href="/signup" buttonStyle="accent" class="w-fit place-self-center">
			Get Started
		</Button>
	</div>
</section>
