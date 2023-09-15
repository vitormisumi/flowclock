export interface Session {
	id: number;
	user_id: string;
	start: string;
	end: string;
	duration: number;
}

export interface Distraction {
	id: number;
	user_id: string;
	session_id: number;
	start: string;
	end: string;
	reason: string;
}
