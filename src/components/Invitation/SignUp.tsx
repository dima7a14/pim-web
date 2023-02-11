import type { Component } from 'solid-js';
import { Form, Field, createForm, zodForm } from '@modular-forms/solid';
import { VsMail, VsAccount } from 'solid-icons/vs';
import { z } from 'zod';

import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';

const schema = z.object({
	name: z
		.string({
			required_error: 'Name is required.',
		})
		.min(1, 'Please enter your name.'),
	email: z
		.string({
			required_error: 'Email is required.',
		})
		.min(1, 'Please enter your email.')
		.email('The email address is badly formatted.'),
	password: z
		.string({
			required_error: 'Password is required.',
		})
		.min(1, 'Please enter your password.')
		.min(8, 'You password must have 8 characters or more.'),
	invitationToken: z.string(),
});

export type SignUpProps = {};

export const SignUp: Component<SignUpProps> = (props) => {
	const signUpForm = createForm<z.input<typeof schema>>({
		validate: zodForm(schema),
	});

	return (
		<Form of={signUpForm} onSubmit={(values) => console.log(values)}>
			<div class="flex flex-col flex-nowrap items-center">
				<h2 class="mb-2 text-xl">Create a User</h2>
				<Field of={signUpForm} name="email">
					{(field) => (
						<div class="mb-2 w-60">
							<Input
								{...field}
								type="email"
								Icon={VsMail}
								placeholder="Your email"
							/>
							<ErrorMessage message={field.error} />
						</div>
					)}
				</Field>
				<Field of={signUpForm} name="name">
					{(field) => (
						<div class="mb-2 w-60">
							<Input
								{...field}
								type="text"
								Icon={VsAccount}
								placeholder="Your name"
							/>
							<ErrorMessage message={field.error} />
						</div>
					)}
				</Field>
				<Field of={signUpForm} name="password">
					{(field) => (
						<div class="mb-2 w-60">
							<PasswordInput
								{...field}
								placeholder="Your password"
							/>
							<ErrorMessage message={field.error} />
						</div>
					)}
				</Field>
				<Field of={signUpForm} name="invitationToken">
					{(field) => <Input {...field} type="hidden" />}
				</Field>
				<Button
					type="submit"
					variant="primary"
					class="px-4 py-2 rounded-md"
				>
					Sign Up
				</Button>
			</div>
		</Form>
	);
};

const ErrorMessage: Component<{ message?: string }> = (props) => {
	return <div class="text-center text-red-500">{props.message}</div>;
};
