export interface Session {
	id: number;
	user_id: string;
	start: string;
	end: string;
	duration: number;
}

export interface Interruption {
	id: number;
	user_id: string;
	session_id: number;
	start: string;
	end: string;
	reason: string;
}

export interface Settings {
	id: number;
	user_id: string;
	ratio: number;
	warning: number;
	date_format: string;
	separator: number;
	clock_format: boolean;
}

export interface Filter {
    timeframe: string;
	current: boolean;
}

export interface Period {
	name: string;
	timeframe: string;
	current: boolean;
}