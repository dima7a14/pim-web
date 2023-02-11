import type { Component } from 'solid-js';

import { Input } from '../Input';
import { Button } from '../Button';

export type CheckInvitationProps = {};

export const CheckInvitation: Component<CheckInvitationProps> = (props) => {
	return (
		<div class="flex flex-row justify-center items-center">
			<Input
				type="text"
				autofocus
				name="invitation_token"
				placeholder="Invitation Token"
				class="w-80 rounded-r-none"
			/>
			<Button
				type="button"
				variant="primary"
				class="rounded-r-full p-3 text-sm"
			>
				Submit
			</Button>
		</div>
	);
};
