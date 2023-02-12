/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import 'solid-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Toaster } from 'solid-toast';

import App from './App';

render(
	() => (
		<Router>
			<QueryClientProvider client={new QueryClient()}>
				<App />
				<Toaster position="bottom-center" />
			</QueryClientProvider>
		</Router>
	),
	document.getElementById('root') as HTMLElement,
);
