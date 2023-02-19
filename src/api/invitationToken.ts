import { axiosInstance } from './common';

const ROOT = '/invitations';

export async function checkInvitationToken(token: string): Promise<boolean> {
	const { data } = await axiosInstance.post<{ valid: boolean }>(
		`${ROOT}/is-valid`,
		{ token },
	);

	return data.valid;
}
