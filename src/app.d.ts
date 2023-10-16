import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database as DB } from '$lib/db/database.types';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
	type Database = DB;
	type UserSession = Database['public']['Tables']['sessions']['Row'];
	type Task = Database['public']['Tables']['tasks']['Row'];
	type Project = Database['public']['Tables']['projects']['Row'];
	type Project = Database['public']['Tables']['projects']['Row'];
	type Settings = Database['public']['Tables']['settings']['Row'];
	type ProjectGroup = Database['public']['Tables']['project_groups']['Row'];
}

declare type Item = import("svelte-dnd-action").Item;
declare type DndEvent<ItemType = Item> = import("svelte-dnd-action").DndEvent<ItemType>;
declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        "on:consider"?: (event: CustomEvent<DndEvent<ItemType>> & {target: EventTarget & T}) => void;
        "on:finalize"?: (event: CustomEvent<DndEvent<ItemType>> & {target: EventTarget & T}) => void;
    }
}