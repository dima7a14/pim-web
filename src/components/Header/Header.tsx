import type { Component } from 'solid-js';

import { Search } from './Search';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Notifications } from './Notifications';
import { UserMenu } from './UserMenu';

export type HeaderProps = {};

export const Header: Component<HeaderProps> = (props) => {
	return (
		<header class="flex flex-row flex-nowrap justify-between items-center">
			<div>
				<Search />
			</div>
			<div class="flex flex-row flex-nowrap justify-end items-center">
				<ThemeSwitcher />
				<Notifications />
				<UserMenu />
			</div>
		</header>
	);
};
