import type { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Form, Field, createForm, zodForm } from '@modular-forms/solid';
import { z } from 'zod';
import { VsMail } from 'solid-icons/vs';
import { createMutation } from '@tanstack/solid-query';
import { toast } from 'solid-toast';

import { signIn, getMe } from '../../api';
import { useUser } from '../../UserProvider';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';

const signInAndGetMe = async (...args: Parameters<typeof signIn>) => {
	const { access_token } = await signIn(...args);
	const user = await getMe();

	return {
		...user,
		access_token,
	};
};

const schema = z.object({
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
		.min(1, 'Please enter your password'),
});

type SignInForm = z.input<typeof schema>;

export type LoginProps = {};

export const Login: Component<LoginProps> = (props) => {
	const userContext = useUser();
	const login = createMutation({
		mutationFn: signInAndGetMe,
	});
	const signInForm = createForm<SignInForm>({
		validate: zodForm(schema),
	});
	const onSubmit = async (values: SignInForm) => {
		try {
			const user = await login.mutateAsync({
				email: values.email,
				password: values.password,
			});
			userContext?.signIn({
				name: user.name,
				email: user.email,
				access_token: user.access_token,
			});
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
		<div>
			<h2 class="text-center text-2xl mb-6">Sign In</h2>
			<Form of={signInForm} onSubmit={onSubmit}>
				<div class="flex flex-col flex-nowrap items-center">
					<Field of={signInForm} name="email">
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
					<Field of={signInForm} name="password">
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
					<Button
						type="submit"
						variant="primary"
						class="px-4 py-2 rounded-md"
					>
						Sign In
					</Button>
				</div>
			</Form>
			<div class="text-center mt-6">
				<A
					href="/registration"
					class="underline hover:no-underline text-lg font-light"
				>
					Sign Up
				</A>
			</div>
		</div>
	);
};

const ErrorMessage: Component<{ message?: string }> = (props) => {
	return <div class="text-center text-red-500">{props.message}</div>;
};
