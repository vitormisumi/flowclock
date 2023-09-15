import { writable } from "svelte/store";
import type { Distraction, Session } from "../session/types";

interface Filter {
    timeframe: string;
    current: boolean
}

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<Session[]>([]);

export const filteredDistractions = writable<Distraction[]>([]);