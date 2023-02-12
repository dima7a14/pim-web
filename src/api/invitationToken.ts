import { API_HOST } from '../config';

const ROOT = `${API_HOST}/invitations`;

export async function checkInvitationToken(token: string): Promise<boolean> {
	const response = await fetch(`${ROOT}/is-valid`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token }),
	});
	const data = await response.json();

	return data.valid;
}
