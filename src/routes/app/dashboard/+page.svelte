<script lang="ts">
	import Sessions from './Sessions.svelte';

	export let data;
</script>

<div
	class="h-screen grid justify-items-center content-evenly pb-20 sm:pb-24 lg:pb-0 bg-primary-900"
>
	<Sessions {data}/>
</div>
