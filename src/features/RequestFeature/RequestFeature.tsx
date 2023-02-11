import type { Component } from 'solid-js';

import { featureRequestsMock } from './mocks';
import { RequestsTable } from './RequestsTable';

export type RequestFeatureProps = {};

export const RequestFeature: Component<RequestFeatureProps> = (props) => {
	return (
		<div>
			<h2 class="mb-6 font-bold text-5xl">
				<span>Requested Features</span>
			</h2>
			<RequestsTable requests={featureRequestsMock} />
		</div>
	);
};
