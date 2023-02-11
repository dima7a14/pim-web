import type { Component } from 'solid-js';

import { CheckInvitation } from './CheckInvitation';

export type InvitationProps = {};

export const Invitation: Component<InvitationProps> = (props) => {
	return <CheckInvitation />;
};
