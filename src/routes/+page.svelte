<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import logo from '$lib/assets/logo.png';
	import Hero from './Hero.svelte';
</script>

<div class="flex h-screen flex-col bg-primary-900">
	<Navbar
		let:hidden
		let:toggle
		class="sticky top-0 z-50 bg-gradient-to-b from-primary-800 to-primary-900"
	>
		<NavBrand href="/">
			<img src={logo} alt="Flouu logo" class="w-12 md:w-16 lg:w-20" />
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
