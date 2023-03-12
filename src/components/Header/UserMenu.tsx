import type { Component } from 'solid-js';
import { CgProfile } from 'solid-icons/cg';
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from 'solid-headless';
import clsx from 'clsx';

import { useUser } from '../../UserProvider';
import { Button } from '../Button';

export type UserMenuProps = {};

export const UserMenu: Component<UserMenuProps> = (props) => {
	const userContext = useUser();

	return (
		<Popover
			defaultOpen={false}
			class="relative flex flex-col justify-center"
		>
			{({ isOpen }) => (
				<>
					<PopoverButton
						class={clsx(
							isOpen() && 'text-opacity-90',
							'group text-4xl p-0 ml-2 rounded-full bg-blue-600 dark:bg-red-500 hover:bg-blue-500 dark:hover:bg-red-400 text-white dark:text border-blue-600 dark:border-red-500',
						)}
					>
						<CgProfile />
					</PopoverButton>
					<Transition
						show={isOpen()}
						enter="transition duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel
							unmount={false}
							class="absolute z-10 w-screen max-w-xs transform translate-y-2 top-full right-0 bg-white dark:bg-gray-600 rounded-md shadow-xl overflow-hidden"
						>
							<div class="overflow-hidden bg-gray-200 dark:bg-gray-900 p-2 text-center text-xl font-medium rounded-t-md border-b-2 border-b-gray-300 dark:border-b-gray-700">
								{userContext?.user()?.name}
							</div>
							<Button
								type="button"
								variant="transparent"
								class="w-full p-2 font-semibold hover:bg-blue-500 dark:hover:bg-red-400 hover:text-white focus-visible:outline-none"
								onClick={userContext?.signOut}
							>
								Log out
							</Button>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
