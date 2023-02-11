import type { Component } from 'solid-js';
import { createSignal, Switch, Match } from 'solid-js';

import { CheckInvitation } from './CheckInvitation';
import { SignUp } from './SignUp';

export type InvitationProps = {};

enum Stages {
	checkInvitation = 'checkInvitation',
	signUp = 'signUp',
}

export const Invitation: Component<InvitationProps> = (props) => {
	const [stage, setStage] = createSignal<Stages>(Stages.checkInvitation);

	return (
		<Switch>
			<Match when={stage() === Stages.checkInvitation}>
				<CheckInvitation />
			</Match>
			<Match when={stage() === Stages.signUp}>
				<SignUp />
			</Match>
		</Switch>
	);
};
