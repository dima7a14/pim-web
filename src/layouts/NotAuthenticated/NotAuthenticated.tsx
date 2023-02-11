import type { ParentComponent } from 'solid-js';

import { Logo } from '../../components/Logo';

export type NotAuthenticatedProps = {};

export const NotAuthenticated: ParentComponent<NotAuthenticatedProps> = (
	props,
) => {
	return (
		<div class="bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-gray-50 w-screen h-screen flex flex-col flex-nowrap items-center">
			<div class="mb-8">
				<Logo />
			</div>
			{props.children}
		</div>
	);
};
