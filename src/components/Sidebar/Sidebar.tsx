import type { Component } from "solid-js";

import { Logo } from "../Logo";

export const Sidebar: Component = () => {
  return (
    <aside class="w-64 bg-Neutral-White shadow-navigation-menu-vertical">
      <header>
        <Logo />
      </header>
    </aside>
  );
};
