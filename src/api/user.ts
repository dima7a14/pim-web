import { API_HOST } from '../config';

const ROOT = `${API_HOST}/users`;

export interface APIUser {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	email: string;
	name: string;
	last_login: string | null;
}

export interface APIToken {
	access_token: string;
}

type SignUpParams = {
	name: string;
	email: string;
	password: string;
	invitation_token: string;
};

export async function signUp(data: SignUpParams): Promise<APIUser & APIToken> {
	const response = await fetch(`${ROOT}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(responseData.message);
	}

	return responseData;
}

type SignInParams = {
	email: string;
	password: string;
};

export async function signIn(data: SignInParams): Promise<APIToken> {
	const response = await fetch(`${ROOT}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(responseData.message);
	}

	return responseData;
}
