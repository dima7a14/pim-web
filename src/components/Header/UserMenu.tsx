import type { Component } from 'solid-js';
import { CgProfile } from 'solid-icons/cg';

import { Button } from '../Button';

export type UserMenuProps = {};

export const UserMenu: Component<UserMenuProps> = (props) => {
	return (
		<Button
			type="button"
			variant="primary"
			disabled
			class="text-4xl p-0 ml-2 rounded-full"
		>
			<CgProfile />
		</Button>
	);
};
