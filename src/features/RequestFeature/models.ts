import type { APIRequestedFeature } from '../../api';

export interface FeatureRequest {
	id: number;
	name: string;
	description?: string;
	author: {
		id: number;
		name: string;
		email: string;
	};
	done: boolean;
}

export function transformFeatureRequest(
	data: APIRequestedFeature,
): FeatureRequest {
	return {
		id: data.id,
		name: data.name,
		description: data.description ?? undefined,
		author: data.author,
		done: data.resolved,
	};
}
