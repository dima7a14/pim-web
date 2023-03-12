import axios, { isAxiosError, AxiosHeaders } from 'axios';

import { API_HOST } from '../config';
import { read as readStorage } from '../utils/storage';
import { clearUser } from '../UserProvider';

function getInitialHeaders(): Partial<AxiosHeaders> {
	const data = readStorage();
	if (data.user) {
		return {
			Authorization: `Bearer ${data.user.access_token}`,
		};
	}

	return {};
}

export const axiosInstance = axios.create({
	baseURL: API_HOST,
	headers: getInitialHeaders(),
});

export function updateToken(token: string = ''): void {
	axiosInstance.defaults.headers.common.Authorization = token
		? `Bearer ${token}`
		: '';
}

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (isAxiosError(error)) {
			if (error.response?.status === 401) {
				clearUser();
			}
		} else {
			console.error(error);
		}
	},
);
