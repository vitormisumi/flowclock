import { writable } from "svelte/store";
import type { Interruption, Session, Filter } from "../types";

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<Session[]>([]);

export const filteredInterruptions = writable<Interruption[]>([]);

export const openRow = writable<null | number>(null);

export const startRow = writable(0);

export const endRow = writable(9);