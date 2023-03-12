import { axiosInstance, updateToken } from './common';

const ROOT = '/users';

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
	const { data: responseData } = await axiosInstance.post<APIUser & APIToken>(
		ROOT,
		data,
	);

	updateToken(responseData.access_token);

	return responseData;
}

type SignInParams = {
	email: string;
	password: string;
};

export async function signIn(data: SignInParams): Promise<APIToken> {
	const { data: responseData } = await axiosInstance.post<APIToken>(
		`${ROOT}/login`,
		data,
	);

	updateToken(responseData.access_token);

	return responseData;
}

export async function signOut(): Promise<void> {
	updateToken();

	return Promise.resolve();
}

export async function getMe(): Promise<APIUser> {
	const { data } = await axiosInstance.get<APIUser>(`${ROOT}/me`);

	return data;
}
