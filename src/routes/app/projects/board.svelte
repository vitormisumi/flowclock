<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';

	interface Board {
		id: number;
		name: string;
		items: { id: number; name: string }[];
	}

	let board: Board[] = [
		{
			id: 1,
			name: 'TODO',
			items: [
				{ id: 41, name: 'item41' },
				{ id: 42, name: 'item42' },
				{ id: 43, name: 'item43' },
				{ id: 44, name: 'item44' },
				{ id: 45, name: 'item45' },
				{ id: 46, name: 'item46' },
				{ id: 47, name: 'item47' },
				{ id: 48, name: 'item48' },
				{ id: 49, name: 'item49' }
			]
		},
		{
			id: 2,
			name: 'DOING',
			items: []
		},
		{
			id: 3,
			name: 'DONE',
			items: []
		}
	];

	const flipDurationMs = 200;

	function handleConsiderColumns(e: CustomEvent<DndEvent<Board>>) {
		board = e.detail.items;
	}

	function handleFinalizeColumns(e: CustomEvent<DndEvent<Board>>) {
		board = e.detail.items;
	}

	function handleConsiderCards(cardId: number, e: CustomEvent<DndEvent<Board>>) {
		const colIdx = board.findIndex((c) => c.id === cardId);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}

	function handleFinalizeCards(cardId: number, e: CustomEvent<DndEvent<Board>>) {
		const colIdx = board.findIndex((c) => c.id === cardId);
		board[colIdx].items = e.detail.items;
		board = [...board];
	}
</script>

<section
	class="board flex w-full"
	use:dndzone={{ items: board, flipDurationMs, type: 'columns' }}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each board as column (column.id)}
		<div class="w-full bg-primary-900 p-2" animate:flip={{ duration: flipDurationMs }}>
			<div>{column.name}</div>
			<div
				class="flex h-full flex-col justify-start gap-2 border-white"
				use:dndzone={{ items: column.items, flipDurationMs }}
				on:consider={(e) => handleConsiderCards(column.id, e)}
				on:finalize={(e) => handleFinalizeCards(column.id, e)}
			>
				{#each column.items as item (item.id)}
					<div
						class="h-8 rounded-lg bg-primary-800 p-2"
						animate:flip={{ duration: flipDurationMs }}
					>
						{item.name}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
