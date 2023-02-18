const KEY = 'PIM';

export interface StorageData {
	access_token?: string;
	invitation_token?: string;
}

export function saveInvitationToken(token: string): void {
	try {
		localStorage.setItem(KEY, JSON.stringify({ invitation_token: token }));
	} catch (err) {
		console.error(err);
	}
}

export function saveAccessToken(token: string): void {
	try {
		localStorage.setItem(KEY, JSON.stringify({ access_token: token }));
	} catch (err) {
		console.error(err);
	}
}

export function clear(): void {
	try {
		localStorage.removeItem(KEY);
	} catch (err) {
		console.error(err);
	}
}

export function read(): StorageData {
	try {
		const raw = localStorage.getItem(KEY);

		if (!raw) {
			return {};
		}

		return JSON.parse(raw);
	} catch (err) {
		console.error(err);

		return {};
	}
}
