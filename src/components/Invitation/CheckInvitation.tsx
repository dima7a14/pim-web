import type { Component } from 'solid-js';
import { Form, Field, createForm, zodForm } from '@modular-forms/solid';
import { z } from 'zod';
import clsx from 'clsx';

import { Input } from '../Input';
import { Button } from '../Button';

const schema = z.object({
	invitationToken: z
		.string({
			required_error: 'Invitation Token is required.',
		})
		.uuid(),
});

export type CheckInvitationProps = {};

export const CheckInvitation: Component<CheckInvitationProps> = (props) => {
	const tokenForm = createForm<z.input<typeof schema>>({
		validate: zodForm(schema),
	});

	return (
		<Form of={tokenForm} onSubmit={(values) => console.log(values)}>
			<div class="flex flex-row justify-center items-center">
				<Field of={tokenForm} name="invitationToken">
					{(field) => (
						<>
							<Input
								{...field}
								type="text"
								autofocus
								placeholder="Invitation Token"
								class={clsx(
									'w-80 h-11 rounded-r-none',
									field.error && 'border-red-500 border-2',
								)}
							/>
						</>
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
