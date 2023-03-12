import type { ParentComponent } from 'solid-js';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

export type AuthenticatedProps = {};

export const Authenticated: ParentComponent<AuthenticatedProps> = (props) => {
	return (
		<div class="bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-gray-50 w-full min-h-screen flex flex-row flex-nowrap">
			<Sidebar />
			<section class="flex-1 px-9 py-6 pb-12 relative">
				<div class="mb-8">
					<Header />
				</div>
				{props.children}
			</section>
		</div>
	);
};
