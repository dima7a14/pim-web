import type { Component } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { toast } from 'solid-toast';

import { getRequestedFeatures } from '../../api';
import { RequestsTable } from './RequestsTable';
import { transformFeatureRequest } from './models';

function fetchRequestedFeatures() {
	return getRequestedFeatures().then((data) =>
		data.map(transformFeatureRequest),
	);
}

export type RequestFeatureProps = {};

export const RequestFeature: Component<RequestFeatureProps> = (props) => {
	const requestedFeaturesQuery = createQuery(
		() => ['/requestedFeatures'],
		async () => {
			try {
				return await fetchRequestedFeatures();
			} catch (err) {
				toast.error('Something wrong!');
			}
		},
	);

	return (
		<div>
			<h2 class="mb-6 font-bold text-5xl">
				<span>Requested Features</span>
			</h2>
			<RequestsTable requests={requestedFeaturesQuery.data ?? []} />
		</div>
	);
};
