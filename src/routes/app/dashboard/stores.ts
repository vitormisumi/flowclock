import { derived, writable } from "svelte/store";
import { periods } from "$lib/constants/constants";

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<Session[]>([]);

export const filteredInterruptions = writable<Interruption[]>([]);

export const openRow = writable<null | number>(null);

export const startRow = writable(0);

export const endRow = writable(9);

export const selectedPeriod = derived(
  filter,
  (filter) => periods.find((x) => x.timeframe === filter.timeframe && x.current === filter.current)
);

export const selectedPlot = writable<'focus' | 'projects' | 'timeframe' | 'interruptions'>('focus')