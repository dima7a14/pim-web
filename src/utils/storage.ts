const KEY = 'PIM';

export interface StorageData {
	invitation_token?: string;
	user?: {
		name: string;
		email: string;
		access_token: string;
	};
}

export function saveInvitationToken(token: string): void {
	try {
		localStorage.setItem(KEY, JSON.stringify({ invitation_token: token }));
	} catch (err) {
		console.error(err);
	}
}

export function saveUser(user: Required<StorageData['user']>): void {
	try {
		localStorage.setItem(KEY, JSON.stringify(user));
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
