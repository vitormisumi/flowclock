<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Clock from './Clock.svelte';
	import Menu from './Menu.svelte';
	import Screen from './Screen.svelte';
	import Warning from './Warning.svelte';
	import { selectedProject } from './projects/stores';
	import { windowWidth } from './stores';

	export let data;

	const sessions = writable();
	$: sessions.set(data.sessions);

	const breaks = writable();
	$: breaks.set(data.breaks);

	const interruptions = writable();
	$: interruptions.set(data.interruptions);

	const settings = writable();
	$: settings.set(data.settings);

	const projects = writable();
	$: projects.set(data.projects);

	const projectGroups = writable();
	$: projectGroups.set(data.projectGroups);

	const tasks = writable();
	$: tasks.set(data.tasks);

	const toDos = writable();
	$: toDos.set(
		data.toDos
			?.filter((x) => x.project_id === $selectedProject.id)
			.filter((x) => data.settings?.completed_to_dos_hidden ? !x.done : x)
	);

	const intentions = writable();
	$: intentions.set(data.intentions);

	const status = writable();
	$: {
		let filteredTasks = data.status?.filter((x) => x.project_id === $selectedProject.id);
		filteredTasks?.forEach((item) => {
			item.tasks.sort((a, b) => b.order - a.order);
		});
		status.set(filteredTasks);
	}

	setContext('user', data.user);
	setContext('sessions', sessions);
	setContext('breaks', breaks);
	setContext('interruptions', interruptions);
	setContext('settings', settings);
	setContext('projects', projects);
	setContext('projectGroups', projectGroups);
	setContext('tasks', tasks);
	setContext('toDos', toDos);
	setContext('intentions', intentions);
	setContext('status', status);

	onMount(() => {
		data.settings?.dark_mode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});
</script>

<svelte:window bind:innerWidth={$windowWidth} />
<Screen>
	<span slot="main">
		<slot />
	</span>
	<span slot="menu">
		<Menu />
	</span>
</Screen>
<Clock />
<Warning />
