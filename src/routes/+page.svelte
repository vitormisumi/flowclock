<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import Hero from './Hero.svelte';
</script>

<Navbar let:hidden let:toggle class="fixed bg-transparent">
	<NavBrand href="/">
        <p>Flouu</p>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden} classUl="items-end md:items-center">
		<NavLi href="/signin">Sign In</NavLi>
		<NavLi><Button href="/signup">Sign Up</Button></NavLi>
	</NavUl>
</Navbar>
<Hero />
