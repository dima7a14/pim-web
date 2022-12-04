import type { Component } from "solid-js";
import { FiSearch } from "solid-icons/fi";

export type SearchProps = {};

export const Search: Component<SearchProps> = (props) => {
  return (
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-Neutral-Gray">
        <FiSearch />
      </div>
      <input
        type="text"
        name="search"
        class="bg-Neutral-White rounded-3xl w-80 py-3 pr-4 pl-10 text-sm text-Neutral-Gray"
        placeholder="Search"
        autofocus
      />
    </div>
  );
};
