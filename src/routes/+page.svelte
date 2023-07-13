<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Card } from 'flowbite-svelte';

	export let data;
</script>

<div class="flex justify-center">
	<Card>
		<Auth
			supabaseClient={data.supabase}
			view="sign_in"
			redirectTo={`${data.url}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #000' } }}
			additionalData={{}}
		/>
	</Card>
</div>
