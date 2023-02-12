import type { Component } from 'solid-js';
import { Form, Field, createForm, zodForm } from '@modular-forms/solid';
import { z } from 'zod';
import clsx from 'clsx';
import { createMutation } from '@tanstack/solid-query';
import { toast } from 'solid-toast';

import { checkInvitationToken } from '../../api';
import { Input } from '../Input';
import { Button } from '../Button';

const schema = z.object({
	invitationToken: z
		.string({
			required_error: 'Invitation Token is required',
		})
		.uuid(),
});

type CheckInvitationForm = z.input<typeof schema>;

export type CheckInvitationProps = {
	onCheck(token: string): void;
};

export const CheckInvitation: Component<CheckInvitationProps> = (props) => {
	const checkToken = createMutation({
		mutationFn: checkInvitationToken,
	});
	const tokenForm = createForm<CheckInvitationForm>({
		validate: zodForm(schema),
	});
	const onSubmit = async (values: CheckInvitationForm) => {
		try {
			const valid = await checkToken.mutateAsync(values.invitationToken);

			if (valid) {
				props.onCheck(values.invitationToken);
				toast.success('Invitation token is valid');
			} else {
				throw new Error('Invitation token is not valid');
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			}

			console.error(err);
		}
	};

	return (
		<Form of={tokenForm} onSubmit={onSubmit}>
			<div class="flex flex-row justify-center items-start">
				<Field of={tokenForm} name="invitationToken">
					{(field) => (
						<div class="flex flex-col flex-nowrap">
							<Input
								{...field.props}
								type="text"
								autofocus
								placeholder="Invitation Token"
								class={clsx(
									'w-80 h-11 rounded-r-none',
									field.error && 'border-red-500 border-2',
								)}
							/>
							{field.error && (
								<div class="text-center text-red-500">
									{field.error}
								</div>
							)}
						</div>
					)}
				</Field>
				<Button
					type="submit"
					variant="primary"
					class="rounded-r-full p-3 text-sm"
				>
					Submit
				</Button>
			</div>
		</Form>
	);
};
