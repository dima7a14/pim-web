/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import 'solid-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Toaster } from 'solid-toast';

import { UserProvider } from './UserProvider';
import App from './App';

render(
	() => (
		<Router>
			<QueryClientProvider client={new QueryClient()}>
				<UserProvider>
					<App />
				</UserProvider>
				<Toaster position="bottom-center" />
			</QueryClientProvider>
		</Router>
	),
	document.getElementById('root') as HTMLElement,
);
