import { writable } from "svelte/store";
import type { Distraction, Session, Filter } from "../types";

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<Session[]>([]);

export const filteredDistractions = writable<Distraction[]>([]);

export const openRow = writable<null | number>(null);

export const startRow = writable(0);

export const endRow = writable(9);