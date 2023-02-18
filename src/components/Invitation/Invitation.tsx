import type { Component } from 'solid-js';
import { createSignal, createEffect, Switch, Match } from 'solid-js';
import { A } from '@solidjs/router';

import { read as readStorage, saveInvitationToken } from '../../utils/storage';
import { CheckInvitation } from './CheckInvitation';
import { SignUp } from './SignUp';

export type InvitationProps = {};

enum Stages {
	checkInvitation = 'checkInvitation',
	signUp = 'signUp',
}

export const Invitation: Component<InvitationProps> = (props) => {
	const [invitationToken, setInvitationToken] = createSignal<string>(
		readStorage().invitation_token ?? '',
	);
	const [stage, setStage] = createSignal<Stages>(
		invitationToken() ? Stages.signUp : Stages.checkInvitation,
	);
	const checkInvitationToken = (token: string) => {
		setInvitationToken(token);
		setStage(Stages.signUp);
	};

	createEffect(() => {
		saveInvitationToken(invitationToken());
	});

	return (
		<div>
			<h2 class="text-center text-2xl mb-6">Sign Up</h2>
			<Switch>
				<Match when={stage() === Stages.checkInvitation}>
					<CheckInvitation onCheck={checkInvitationToken} />
				</Match>
				<Match when={stage() === Stages.signUp}>
					<SignUp invitationToken={invitationToken()} />
				</Match>
			</Switch>
			<div class="text-center mt-6">
				<A
					href="/login"
					class="underline hover:no-underline text-lg font-light"
				>
					Sign In
				</A>
			</div>
		</div>
	);
};
