export function filterSessionsByDay(
		sessions: FilteredSession[],
		today: Date,
		current: number
	): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getDate() + 1 === today.getDate() + current &&
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	export function filterInterruptionsByDay(
		interruptions: Interruption[],
		today: Date,
		current: number
	): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getDate() + 1 === today.getDate() + current &&
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	export function filterSessionsByCurrentWeek(
		sessions: FilteredSession[],
		today: Date
	): FilteredSession[] {
		return sessions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
			return date > beginningOfWeek;
		});
	}

	export function filterInterruptionsByCurrentWeek(
		interruptions: Interruption[],
		today: Date
	): Interruption[] {
		return interruptions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
			return date > beginningOfWeek;
		});
	}

	export function filterSessionsByLastWeek(sessions: FilteredSession[], today: Date): FilteredSession[] {
		return sessions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
			const endOfLastWeek = new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
			return date > beginningOfLastWeek && date < endOfLastWeek;
		});
	}

	export function filterInterruptionsByLastWeek(
		interruptions: Interruption[],
		today: Date
	): Interruption[] {
		return interruptions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
			const endOfLastWeek = new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
			return date > beginningOfLastWeek && date < endOfLastWeek;
		});
	}

	export function filterSessionsByMonth(
		sessions: FilteredSession[],
		today: Date,
		current: number
	): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getMonth() + 1 === today.getMonth() + current &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	export function filterInterruptionsByMonth(
		interruptions: Interruption[],
		today: Date,
		current: number
	): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getMonth() + 1 === today.getMonth() + current &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	export function filterSessionsByYear(
		sessions: FilteredSession[],
		today: Date,
		current: number
	): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return date.getFullYear() + 1 === today.getFullYear() + current;
		});
	}

	export function filterInterruptionsByYear(
		interruptions: Interruption[],
		today: Date,
		current: number
	): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return date.getFullYear() + 1 === today.getFullYear() + current;
		});
	}