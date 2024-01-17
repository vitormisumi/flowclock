<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, Button } from 'flowbite-svelte';
	import logo from '$lib/assets/logo.png';

	let menuOpen = false;
</script>

<Navbar
	let:hidden
	let:toggle
	class="fixed top-0 z-50 bg-gradient-to-b from-primary-800 to-secondary-800"
>
	<NavBrand href="/">
		<img src={logo} alt="FlowClock logo" class="w-28 md:w-32 lg:w-40" />
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
		classUl="bg-primary-800 border-none shadow-lg md:shadow-none md:bg-transparent items-center"
	>
		<NavLi>
			<Button size="sm" href="/signin" class="bg-transparent text-primary-50 transition-colors">
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
	</NavUl>
</Navbar>
