import type { Component } from 'solid-js';
import { FiSearch } from 'solid-icons/fi';

import { Input } from '../Input';

export type SearchProps = {};

export const Search: Component<SearchProps> = (props) => {
	return (
		<Input
			type="text"
			autofocus
			name="search"
			placeholder="Search"
			Icon={FiSearch}
			class="w-80"
		/>
	);
};
