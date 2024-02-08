<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import logo from '$lib/assets/logo.png';

	let menuOpen = false;
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
		buttonStyle="transparent"
		class="w-8 md:hidden"
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
				href="/"
				size="sm"
				buttonStyle="transparent"
				on:click={() => {
					if (innerWidth < 768) {
						toggle();
						menuOpen = !menuOpen;
					}
				}}
			>
				Home
			</Button>
		</NavLi>
		<NavLi>
			<Button
				href="/blog"
				size="sm"
				buttonStyle="transparent"
				on:click={() => {
					if (innerWidth < 768) {
						toggle();
						menuOpen = !menuOpen;
					}
				}}
			>
				Blog
			</Button>
		</NavLi>
		<div class="invisible h-6 border border-secondary-700 md:visible" />
		<div
			class="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-primary-900 md:static md:bg-transparent"
		>
			<NavLi>
				<Button href="/signin" buttonStyle="transparent">Sign In</Button>
			</NavLi>
			<NavLi>
				<Button href="/signup" buttonStyle="accent">Sign Up</Button>
			</NavLi>
		</div>
	</NavUl>
</Navbar>
