<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Menu from './Menu.svelte';
	import Clock from './Clock.svelte';
	import Warning from './Warning.svelte';
	import Screen from './Screen.svelte';

	export let data;

	const sessions = writable();
	$: sessions.set(
		data.sessions?.map((x) => {
			let sessionInterruptions = data.interruptions?.filter((d) => d.session_id === x.id);
			let interruptionDuration = sessionInterruptions?.reduce((accumulator, object) => {
				return accumulator + Date.parse(object.end) - Date.parse(object.start);
			}, 0);
			return Object.assign(x, {
				duration: Date.parse(x.end) - Date.parse(x.start) - interruptionDuration
			});
		})
	);

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

	setContext('user', data.user);
	setContext('sessions', sessions);
	setContext('interruptions', interruptions);
	setContext('settings', settings);
	setContext('projects', projects);
	setContext('projectGroups', projectGroups);
	setContext('tasks', tasks);
</script>

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
