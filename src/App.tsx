import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { features } from './constants/features';
import { Authenticated } from './layouts/Authenticated';
import { NotAuthenticated } from './layouts/NotAuthenticated';
import { NotFound } from './components/NotFound';
import { Invitation } from './components/Invitation';

const App: Component = () => {
	const [authenticated, setAuthenticated] = createSignal(false);

	return (
		<Show
			when={authenticated()}
			fallback={
				<NotAuthenticated>
					<Routes>
						<Route path="/" component={Invitation} />
					</Routes>
				</NotAuthenticated>
			}
		>
			<Authenticated>
				<Routes>
					{Object.values(features).map((feature) => (
						<Route
							path={feature.path}
							component={feature.component}
						/>
					))}
					<Route path="/*" component={NotFound} />
				</Routes>
			</Authenticated>
		</Show>
	);
};

export default App;
