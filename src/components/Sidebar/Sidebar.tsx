import type { Component } from "solid-js";

import { Logo } from "../Logo";
import { FeaturesList } from "./FeaturesList";

export const Sidebar: Component = () => {
  return (
    <aside class="w-64 bg-Neutral-White dark:bg-Neutral-Black shadow-navigation-menu-vertical">
      <header>
        <Logo />
        <FeaturesList />
      </header>
    </aside>
  );
};
