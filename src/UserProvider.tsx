import {
	createSignal,
	createContext,
	useContext,
	Accessor,
	ParentComponent,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { signOut } from './api';
import {
	read as readStorage,
	saveUser,
	clear as clearStorage,
} from './utils/storage';

interface User {
	email: string;
	name: string;
	access_token: string;
}

type UserAPI = {
	user: Accessor<User | null>;
	signIn(data: User): void;
	signOut(): void;
};

const UserContext = createContext<UserAPI>();

const [user, setUser] = createSignal<User | null>(readStorage().user ?? null);

export function clientSignOut() {
	setUser(null);
	clearStorage();
	signOut();
}

export const UserProvider: ParentComponent = (props) => {
	const navigate = useNavigate();
	const userAPI: UserAPI = {
		user,
		signIn(data: User) {
			setUser(data);
			saveUser(data);
			navigate('/', { replace: true });
		},
		signOut() {
			clientSignOut();
			navigate('/login', { replace: true });
		},
	};

	return (
		<UserContext.Provider value={userAPI}>
			{props.children}
		</UserContext.Provider>
	);
};

export function useUser() {
	return useContext(UserContext);
}

export function clearUser() {
	const userAPI = useUser();

	if (userAPI) {
		userAPI.signOut();
	} else {
		clientSignOut();
	}
}
