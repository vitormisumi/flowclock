<script lang="ts">
	import { Card, Label, Input, Button } from 'flowbite-svelte';
</script>

<div class="grid justify-center">
	<Card class="grid justify-center m-4">
		<h1 class="text-center text-xl text-primary-600 font-bold mb-4">Login</h1>
		<Label for="input-group-1" class="block mb-2">Email</Label>
		<Input id="email" type="email" placeholder="Type your email">
			<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
		>
		<Label for="input-group-1" class="block mt-4 mb-2">Password</Label>
		<Input id="email" type="email" placeholder="Type your password">
			<i class="fa-solid fa-lock" aria-hidden="true" slot="left" /></Input
		>
        <Button class="mt-4 ">Login</Button>
        <p class="mt-2">Don't have an account yet? <span class="text-accent-500"><a href='/signup'>Sign up here</a></span></p>
	</Card>
</div>
