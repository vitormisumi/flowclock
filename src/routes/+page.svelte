<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import Hero from './Hero.svelte';
	import { onMount } from 'svelte';
	import { paint } from './gradient';

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
</script>

<div class="flex h-screen flex-col">
	<Navbar
		let:hidden
		let:toggle
		class="sticky top-0 z-50 bg-gradient-to-b from-primary-800 to-secondary-900"
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
			<NavLi href="/signin" nonActiveClass="text-primary-50 hover:text-primary-200">Sign In</NavLi>
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
