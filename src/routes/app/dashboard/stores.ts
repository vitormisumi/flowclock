import { writable } from "svelte/store";
import type { Distraction, Session, Filter } from "../types";

export const filter = writable<Filter>({timeframe: 'all', current: true});

export const filteredSessions = writable<Session[]>([]);

export const filteredDistractions = writable<Distraction[]>([]);