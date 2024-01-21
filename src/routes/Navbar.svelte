<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, Button } from 'flowbite-svelte';
	import logo from '$lib/assets/logo.png';

	export let innerWidth: number;
	export let features: HTMLElement;
	export let faq: HTMLElement;

	let menuOpen = false;

	function scrollTo(e: HTMLElement) {
		e.scrollIntoView();
	}
</script>

<Navbar
	let:hidden
	let:toggle
	class="fixed top-0 z-50 bg-gradient-to-b from-primary-800 to-secondary-800"
>
	<NavBrand href="/">
		<img src={logo} alt="FlowClock logo" class="w-28 pl-4 md:w-32 lg:w-40" />
	</NavBrand>
	<Button
		size="sm"
		class="w-8 bg-transparent focus:bg-transparent focus:ring-0 md:hidden"
		on:click={() => {
			toggle();
			menuOpen = !menuOpen;
		}}
	>
		<i class="fa-solid {menuOpen ? 'fa-x' : 'fa-bars'}" />
	</Button>
	<NavUl
		{hidden}
		classUl="bg-transparent border-none shadow-none items-end h-screen md:h-auto relative md:items-center"
	>
		<NavLi>
			<Button
				size="sm"
				class="bg-transparent text-primary-50 transition-colors hover:bg-transparent"
				on:click={() => {
					scrollTo(features);
					if (innerWidth < 768) {
						toggle();
						menuOpen = !menuOpen;
					}
				}}
			>
				Features
			</Button>
		</NavLi>
		<NavLi>
			<Button
				size="sm"
				class="bg-transparent text-primary-50 transition-colors hover:bg-transparent"
				on:click={() => {
					scrollTo(faq);
					if (innerWidth < 768) {
						toggle();
						menuOpen = !menuOpen;
					}
				}}
			>
				FAQ
			</Button>
		</NavLi>
		<div class="invisible h-6 border border-primary-900 md:visible" />
		<div
			class="absolute bottom-16 left-0 flex w-full justify-between gap-4 rounded-lg bg-primary-900 md:static md:bg-transparent"
		>
			<NavLi>
				<Button
					size="sm"
					href="/signin"
					class="bg-transparent text-primary-50 transition-colors hover:bg-transparent"
				>
					Sign In
				</Button>
			</NavLi>
			<NavLi>
				<Button
					size="sm"
					href="/signup"
					outline
					class="border-accent-500 text-accent-500 transition-colors hover:bg-accent-500"
				>
					Sign Up
				</Button>
			</NavLi>
		</div>
	</NavUl>
</Navbar>
