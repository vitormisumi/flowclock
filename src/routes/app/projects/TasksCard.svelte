<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Notification from '../../Notification.svelte';
	import TasksBoard from './TasksBoard.svelte';
	import TasksMenu from './TasksMenu.svelte';

	let notifications = 0;
	let success: boolean;
	let message: string;

	let open: boolean;
</script>

<Card
	class="grid h-full min-h-full min-w-full gap-1 border-0 bg-secondary-100 dark:bg-secondary-800"
>
	<div class="flex items-center justify-between">
		<h2 class="pr-1 font-bold text-primary-900 dark:text-primary-50">Tasks</h2>
		<TasksMenu bind:open />
	</div>
	<TasksBoard bind:notifications bind:success bind:message />
</Card>
{#if notifications}
	{#key notifications}
		<Notification {success} {message} />
	{/key}
{/if}
