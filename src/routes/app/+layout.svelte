<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Menu from './Menu.svelte';
	import Clock from './Clock.svelte';
	import Warning from './Warning.svelte';
	import Screen from './Screen.svelte';
	import { selectedProject } from './projects/stores';

	export let data;

	const sessions = writable();
	$: sessions.set(
		data.sessions?.map((x) => {
			let sessionInterruptions = data.interruptions?.filter((d) => d.session_id === x.id);
			let interruptionDuration = sessionInterruptions?.reduce((accumulator, object) => {
				return accumulator + Date.parse(object.end) - Date.parse(object.start);
			}, 0);
			if (interruptionDuration && x.end) {
				return Object.assign(x, {
					duration: Date.parse(x.end) - Date.parse(x.start) - interruptionDuration
				});
			} else if (x.end) {
				return Object.assign(x, {
					duration: Date.parse(x.end) - Date.parse(x.start)
				});
			}
		})
	);
	$: console.log($sessions)

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

	const status = writable();
	$: status.set(data.status?.filter((x) => x.project_id === $selectedProject.id));

	setContext('user', data.user);
	setContext('sessions', sessions);
	setContext('interruptions', interruptions);
	setContext('settings', settings);
	setContext('projects', projects);
	setContext('projectGroups', projectGroups);
	setContext('tasks', tasks);
	setContext('status', status);
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
