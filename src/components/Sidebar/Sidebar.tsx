import type { Component } from "solid-js";

import { Logo } from "../Logo";
import { FeaturesList } from "./FeaturesList";

export const Sidebar: Component = () => {
  return (
    <aside class="w-64 bg-white dark:bg-black shadow-xl">
      <header>
        <Logo />
        <FeaturesList />
      </header>
    </aside>
  );
};
