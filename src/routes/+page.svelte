<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import logo from '$lib/assets/logo.png'
	import Hero from './Hero.svelte';
</script>

<Navbar let:hidden let:toggle class="bg-transparent">
	<NavBrand href="/">
		<img src={logo} alt="Flouu logo" class="w-12 md:w-16 lg:w-20">
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden} classUl="items-end md:items-center">
		<NavLi href="/signin">Sign In</NavLi>
		<NavLi><Button href="/signup">Sign Up</Button></NavLi>
	</NavUl>
</Navbar>
<Hero />
