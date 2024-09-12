import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database as DB } from '$lib/db/database.types';
import Pocketbase from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: Pocketbase
		}
	}

	interface Break {
		id: string;
		user_id: string;
		calculated_duration: number;
		actual_duration: number;
		start: string;
		session_id: string;
		created: string;
		updated: string;
	}

	interface Intention {
		id: string;
		user_id: string;
		name: string;
		description: string | null;
		project_id: string;
		created: string;
		updated: string;
	}

	interface Interruption {
		id: string;
		start: string;
		end: string | null;
		reason: 'bathroom' | 'colleague' | 'door bell' | 'message' | 'pet' | 'phone' | 'relative';
		user_id: string;
		duration: number;
		session_id: string;
		created: string;
		updated: string;
	}

	interface ProjectGroup {
		id: string;
		user_id: string;
		name: string;
		created: string;
		updated: string;
	}
	
	interface Project {
		id: string;
		user_id: string;
		name: string;
		goal: string | null;
		description: string | null;
		project_group_id: string;
		status: 'idea' | 'on going' | 'completed' | 'suspended' | 'planning';
		tasks: boolean;
		to_dos: boolean;
		intentions: boolean;
		created: string;
		updated: string;
	}
	
	interface Session {
		id: string;
		user_id: string;
		start: string;
		end: string | null;
		intentions_id: string;
		interruption_duration: number;
		total_duration: number;
		project_id: string | null;
		task_id: string | null;
		created: string;
		updated: string;
	}
	
	interface TaskStatus {
		id: string;
		project_id: string;
		status: string;
		user_id: string;
		order: number;
		created: string;
		updated: string;
	}
	
	interface Task {
		id: string;
		user_id: string;
		due_date: string | null;
		description: string | null;
		name: string;
		project_id: string;
		task_status_id: string;
		priority: 0 | 1 | 2 | 3;
		order: number;
		created: string;
		updated: string;
	}
	
	interface ToDo {
		id: string;
		user_id: string;
		due_date: string | null;
		description: string | null;
		name: string;
		project_id: string;
		done: boolean;
		priority: 0 | 1 | 2 | 3;
		created: string;
		updated: string;
	}
	
	interface Settings {
		id: string;
		user_id: string;
		ratio: number;
		warning: number;
		date_format: string;
		separator: number;
		twenty_four_hour_clock: boolean;
		break_message: string;
		project_id: string;
		tasks_sorting: 'name' | 'due date' | 'priority';
		project_card_hidden: boolean;
		completed_to_dos_hidden: boolean;
		dark_mode: boolean;
		to_dos_sorting: 'name' | 'due date' | 'priority';
		created: string;
		updated: string;
	}

	type Period = {
		name: string;
		timeframe: string;
		current: boolean;
	}
	type Filter = {
		timeframe: string;
		current: boolean;
	}
	type Post = {
		author: { _ref: string; _type: string };
		title: string;
		body: InputValue;
		_createdAt: string;
		estimatedReadingTime: number;
	}

	type Author = {
		name: string;
		_id: string;
		imageUrl: string;
	}
}