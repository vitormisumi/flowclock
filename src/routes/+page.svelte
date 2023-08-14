<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import Hero from './Hero.svelte';
</script>

<Navbar let:hidden let:toggle class="w-full bg-primary-900">
	<NavBrand href="/">
        <p>Flouu</p>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/signin">Sign In</NavLi>
		<Button href="/signup">Sign Up</Button>
	</NavUl>
</Navbar>
<Hero />
