<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import Hero from './Hero.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
		if (!canvas) {
			throw new Error('Canvas element not found');
		}
		const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!context) {
			throw new Error('2D context not available');
		}

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});

	function paint(context: CanvasRenderingContext2D, t: number): void {
		const { width, height } = context.canvas;
		const imageData = context.getImageData(0, 0, width, height);

		for (let p = 0; p < imageData.data.length; p += 4) {
			const i = p / 4;
			const x = i % width;
			const y = (i / width) >>> 0;

			const red = 64 + (128 * x) / width + 64 * Math.sin(t / 1000);
			const green = 64 + (128 * y) / height + 64 * Math.cos(t / 1000);
			const blue = 128;

			imageData.data[p + 0] = red;
			imageData.data[p + 1] = green;
			imageData.data[p + 2] = blue;
			imageData.data[p + 3] = 255;
		}

		context.putImageData(imageData, 0, 0);
	}
</script>

<div class="flex h-screen flex-col">
	<Navbar
		let:hidden
		let:toggle
		class="sticky top-0 z-50 bg-gradient-to-b from-primary-800 to-primary-900"
	>
		<NavBrand href="/">
			<canvas class="h-8 w-40 md:w-48 lg:w-60" />
		</NavBrand>
		<NavHamburger on:click={toggle} menuClass="text-primary-50" />
		<NavUl
			{hidden}
			classUl="items-end bg-primary-800 border-none shadow-lg shadow-primary-900 md:shadow-none md:items-center md:bg-transparent"
			divClass="absolute top-10 right-2 md:static md:block"
		>
			<NavLi href="/signin" class="text-primary-50">Sign In</NavLi>
			<NavLi
				><Button
					href="/signup"
					outline
					class="border-accent-500 text-accent-500 transition-colors hover:bg-accent-500"
					>Sign Up</Button
				></NavLi
			>
		</NavUl>
	</Navbar>
	<div class="flex h-full items-center justify-center">
		<Hero />
	</div>
</div>

<style>
	canvas {
		mask: url(./logo.svg) 50% 50% no-repeat;
		mask-size: 100%;
		-webkit-mask: url(./logo.svg) 50% 50% no-repeat;
		-webkit-mask-size: 100%;
	}
</style>
