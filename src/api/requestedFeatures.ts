import { axiosInstance } from './common';

const ROOT = '/requested-features';

export interface APIRequestedFeature {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
	description: string | null;
	author: {
		id: number;
		name: string;
		email: string;
	};
	resolved: boolean;
}

export async function getRequestedFeatures(): Promise<APIRequestedFeature[]> {
	const { data } = await axiosInstance.get<APIRequestedFeature[]>(ROOT);

	return data;
}

export async function createRequestedFeature(
	values: Pick<APIRequestedFeature, 'name' | 'description'>,
): Promise<APIRequestedFeature> {
	const { data } = await axiosInstance.post<APIRequestedFeature>(
		ROOT,
		values,
	);

	return data;
}

export async function updateRequestedFeature(
	values: Required<Pick<APIRequestedFeature, 'id'>> &
		Partial<
			Pick<APIRequestedFeature, 'name' | 'description' | 'resolved'> & {
				author_id?: number;
			}
		>,
): Promise<APIRequestedFeature> {
	const { data } = await axiosInstance.put<APIRequestedFeature>(
		`${ROOT}/${values.id}`,
		values,
	);

	return data;
}

export async function deleteRequestedFeature(id: number) {
	const { data } = await axiosInstance.delete<{ done: boolean }>(
		`${ROOT}/${id}`,
	);

	return { done: data.done, id };
}
