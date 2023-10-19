import { writable } from "svelte/store";

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<FilteredSession[]>([]);

export const filteredInterruptions = writable<Interruption[]>([]);

export const openRow = writable<null | number>(null);

export const startRow = writable(0);

export const endRow = writable(9);