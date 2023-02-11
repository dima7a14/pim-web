import type { Component, JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import type { IconTypes } from 'solid-icons';
import clsx from 'clsx';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
	Icon?: IconTypes;
};

export const Input: Component<InputProps> = (props) => {
	const [iconProps, inputProps] = splitProps(props, ['Icon']);

	return (
		<div class="relative w-full h-full">
			<Show when={iconProps.Icon} keyed>
				{(Icon) => (
					<div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
						<Icon />
					</div>
				)}
			</Show>
			<input
				{...inputProps}
				class={clsx(
					'bg-white rounded-3xl py-3 pr-4 text-sm text-gray-500',
					iconProps.Icon ? 'pl-10' : 'pl-4',
					props.class,
				)}
			/>
		</div>
	);
};
