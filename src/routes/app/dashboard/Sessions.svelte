<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Session, SupabaseClient, User, PostgrestError } from '@supabase/supabase-js';

	export let data: {
		settings: any;
		session: Session;
		supabase: SupabaseClient<any, 'public', any>;
		user: User | null;
		error: PostgrestError | null;
		sessions: any[];
	};
</script>

<h2 class="text-secondary-50 text-xl font-bold">Last Sessions</h2>
<Table>
	<TableHead>
		<TableHeadCell>Start</TableHeadCell>
		<TableHeadCell>End</TableHeadCell>
		<TableHeadCell>Duration</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.sessions as session}
			<TableBodyRow>
				<TableBodyCell>{session.started_at}</TableBodyCell>
				<TableBodyCell>{session.ended_at}</TableBodyCell>
				<TableBodyCell
					>{millisecondsToClock(
						Date.parse(session.ended_at) - Date.parse(session.started_at)
					)}</TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
