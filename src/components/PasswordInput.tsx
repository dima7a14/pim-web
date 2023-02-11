import { createSignal, Component } from 'solid-js';
import { VsEye, VsEyeClosed } from 'solid-icons/vs';

import { Button } from './Button';
import { Input, InputProps } from './Input';

export type PasswordInputProps = Omit<InputProps, 'type' | 'Input'>;

export const PasswordInput: Component<PasswordInputProps> = (props) => {
	const [show, setShow] = createSignal<boolean>(false);
	const toggle = () => setShow(!show());

	const Icon = () =>
		show()
			? () => (
					<Button
						type="button"
						variant="transparent"
						onClick={toggle}
					>
						<VsEyeClosed />
					</Button>
			  )
			: () => (
					<Button
						type="button"
						variant="transparent"
						onClick={toggle}
					>
						<VsEye />
					</Button>
			  );
	const type = () => (show() ? 'text' : 'password');

	return <Input {...props} Icon={Icon()} type={type()} />;
};
