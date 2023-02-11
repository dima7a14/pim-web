import type { ParentComponent, JSX } from 'solid-js';
import clsx from 'clsx';

export type ButtonProps = {
	type: 'button' | 'submit' | 'reset';
	class?: string;
	onClick?: JSX.DOMAttributes<HTMLButtonElement>['onClick'];
	variant?:
		| 'default'
		| 'primary'
		| 'secondary'
		| 'info'
		| 'danger'
		| 'transparent';
	disabled?: boolean;
};

function getButtonColors(variant: Required<ButtonProps['variant']>): string {
	switch (variant) {
		case 'primary':
			return 'bg-blue-600 hover:bg-blue-500 text-white border-blue-600';

		case 'secondary':
			return 'bg-yellow-400 hover:bg-yellow-300 text-black border-yellow-400';

		case 'info':
			return 'bg-green-500 hover:bg-green-400 text-white border-green-500';

		case 'danger':
			return 'bg-red-400 hover:bg-red-300 text-white border-red-400';

		case 'transparent':
			return '';

		case 'default':
		default:
			return 'bg-white hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-600';
	}
}

export const Button: ParentComponent<ButtonProps> = (props) => {
	const buttonClass = clsx(
		getButtonColors(props.variant),
		props.disabled ? 'opacity-30 cursor-not-allowed border-1' : '',
		props.class,
	);

	return (
		<button
			type={props.type}
			disabled={props.disabled}
			class={buttonClass}
			role="button"
			tabIndex="0"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
