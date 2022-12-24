import type { Component } from "solid-js";

export const Logo: Component = () => {
  return (
    <h2 class="p-6 text-center font-normal text-sm text-gray-500 dark:text-gray-300 word-spacing-wide">
      <span class="text-red-500 font-black text-2xl">P</span>ersonal&nbsp;
      <span class="text-red-500 font-black text-2xl">I</span>deas&nbsp;
      <span class="text-red-500 font-black text-2xl">M</span>anager
    </h2>
  );
};
