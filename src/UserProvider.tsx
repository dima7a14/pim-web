import {
	createSignal,
	createContext,
	useContext,
	Accessor,
	ParentComponent,
} from 'solid-js';

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

export const UserProvider: ParentComponent = (props) => {
	const [user, setUser] = createSignal<User | null>(
		readStorage().user ?? null,
	);
	const userAPI: UserAPI = {
		user,
		signIn(data: User) {
			setUser(data);
			saveUser(data);
		},
		signOut() {
			setUser(null);
			clearStorage();
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
