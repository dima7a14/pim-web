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
	const [invitationToken, setInvitationToken] = createSignal<string>('');
	const [stage, setStage] = createSignal<Stages>(Stages.checkInvitation);
	const checkInvitationToken = (token: string) => {
		setInvitationToken(token);
		setStage(Stages.signUp);
	};

	return (
		<Switch>
			<Match when={stage() === Stages.checkInvitation}>
				<CheckInvitation onCheck={checkInvitationToken} />
			</Match>
			<Match when={stage() === Stages.signUp}>
				<SignUp invitationToken={invitationToken()} />
			</Match>
		</Switch>
	);
};
