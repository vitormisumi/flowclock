<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { selectedProject } from './projects/stores';
	import { page } from '$app/stores';
	import { session } from './session/stores';
	import Menu from './Menu.svelte';
	import Clock from './Clock.svelte';
	import Warning from './Warning.svelte';
	import Screen from './Screen.svelte';

	export let data;

	const sessions = writable();
	$: sessions.set(data.sessions);

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
	$: toDos.set(data.toDos);

	const intentions = writable();
	$: intentions.set(data.intentions);

	const status = writable();
	$: status.set(data.status?.filter((x) => x.project_id === $selectedProject.id));

	setContext('user', data.user);
	setContext('sessions', sessions);
	setContext('interruptions', interruptions);
	setContext('settings', settings);
	setContext('projects', projects);
	setContext('projectGroups', projectGroups);
	setContext('tasks', tasks);
	setContext('toDos', toDos);
	setContext('intentions', intentions);
	setContext('status', status);

	$page.data.supabase
		.channel('sessions-channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, (payload: any) => {
			console.log(payload);
			if (payload.eventType === 'INSERT' && !payload.new.end) {
				session.start(Date.parse(payload.new.start));
			} else if (payload.eventType === 'UPDATE' && payload.new.id === session.id) {
				session.end(Date.parse(payload.new.end));
			}
		})
		.subscribe();
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
