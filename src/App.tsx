import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { features } from './constants/features';
import { Authenticated } from './layouts/Authenticated';
import { NotAuthenticated } from './layouts/NotAuthenticated';
import { NotFound } from './components/NotFound';
import { Invitation } from './components/Invitation';
import { Login } from './components/Login';
import { useUser } from './UserProvider';

const App: Component = () => {
	const userContext = useUser();

	return (
		<Show
			when={!!userContext?.user()}
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
