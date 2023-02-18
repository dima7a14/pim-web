import type { Component } from 'solid-js';
import { Form, Field, createForm, zodForm } from '@modular-forms/solid';
import { VsMail, VsAccount } from 'solid-icons/vs';
import { z } from 'zod';
import { createMutation } from '@tanstack/solid-query';
import { toast } from 'solid-toast';

import { signUp } from '../../api';
import { saveAccessToken } from '../../utils/storage';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';

const schema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, 'Please enter your name'),
	email: z
		.string({
			required_error: 'Email is required',
		})
		.min(1, 'Please enter your email')
		.email('The email address is badly formatted'),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(1, 'Please enter your password')
		.min(8, 'The password must have 8 characters or more'),
	invitationToken: z.string(),
});

type SignUpForm = z.input<typeof schema>;

export type SignUpProps = {
	invitationToken: string;
};

export const SignUp: Component<SignUpProps> = (props) => {
	const register = createMutation({
		mutationFn: signUp,
	});
	const signUpForm = createForm<SignUpForm>({
		validate: zodForm(schema),
	});
	const onSubmit = async (values: SignUpForm) => {
		try {
			const user = await register.mutateAsync({
				name: values.name,
				email: values.email,
				password: values.password,
				invitation_token: values.invitationToken,
			});
			saveAccessToken(user.access_token);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('Something bad happened!');
			}

			console.error(err);
		}
	};

	return (
		<Form of={signUpForm} onSubmit={onSubmit}>
			<div class="flex flex-col flex-nowrap items-center">
				<h2 class="mb-2 text-xl">Create a User</h2>
				<Field of={signUpForm} name="email">
					{(field) => (
						<div class="mb-2 w-60">
							<Input
								{...field.props}
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
								{...field.props}
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
								{...field.props}
								placeholder="Your password"
							/>
							<ErrorMessage message={field.error} />
						</div>
					)}
				</Field>
				<Field of={signUpForm} name="invitationToken">
					{(field) => (
						<Input
							{...field.props}
							type="hidden"
							value={props.invitationToken}
						/>
					)}
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
