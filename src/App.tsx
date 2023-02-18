import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { features } from './constants/features';
import { read as readStorage } from './utils/storage';
import { Authenticated } from './layouts/Authenticated';
import { NotAuthenticated } from './layouts/NotAuthenticated';
import { NotFound } from './components/NotFound';
import { Invitation } from './components/Invitation';
import { Login } from './components/Login';

const App: Component = () => {
	// TODO: use solid-js stores
	const cachedData = readStorage();
	const authenticated = !!cachedData.access_token;

	return (
		<Show
			when={authenticated}
			fallback={
				<NotAuthenticated>
					<Routes>
						<Route path="/login" component={Login} />
						<Route
							path={['/registration', '/*']}
							component={Invitation}
						/>
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
