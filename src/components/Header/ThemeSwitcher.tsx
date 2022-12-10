import { createSignal, onMount, onCleanup } from "solid-js";
import type { Component } from "solid-js";
import { IoMoon, IoSunny, IoSettings } from "solid-icons/io";

import { Button } from "../Button";

enum Themes {
  light = "light",
  dark = "dark",
  system = "system",
}

function getSystemTheme(): Themes {
  if (typeof window === "undefined") {
    return Themes.light;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return Themes.dark;
  }

  return Themes.light;
}

function applyTheme(theme: Themes): void {
  if (typeof window !== "undefined") {
    if (theme === Themes.dark) {
      window.document.documentElement.classList.add(Themes.dark);
    } else {
      window.document.documentElement.classList.remove(Themes.dark);
    }
  }
}

const THEME_KEY = "color-scheme";

function readTheme(): Themes | null {
  if (typeof window === "undefined") {
    return Themes.system;
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY) as Themes | null;

  return storedTheme;
}

function writeTheme(theme: Themes): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }
}

function removeTheme(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(THEME_KEY);
    applyTheme(getSystemTheme());
  }
}

export const ThemeSwitcher: Component = (props) => {
  const [currentTheme, setCurrentTheme] = createSignal(Themes.system);
  const [manuallySelected, setManuallySelected] = createSignal(false);

  onMount(() => {
    const storedTheme = readTheme();

    if (storedTheme !== null) {
      setManuallySelected(true);
      setCurrentTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      const systemTheme = getSystemTheme();

      applyTheme(systemTheme);
    }
  });

  const checkTheme = () => {
    if (!manuallySelected()) {
      const systemTheme = getSystemTheme();

      setCurrentTheme(systemTheme);
      applyTheme(systemTheme);
    }
  };

  onMount(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", checkTheme);
  });

  onCleanup(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.removeEventListener("change", checkTheme);
  });

  const handleClick = () => {
    switch (currentTheme()) {
      case Themes.system: {
        setCurrentTheme(Themes.dark);
        writeTheme(Themes.dark);
        setManuallySelected(true);
        break;
      }

      case Themes.dark: {
        setCurrentTheme(Themes.light);
        writeTheme(Themes.light);
        setManuallySelected(true);
        break;
      }

      case Themes.light:
      default: {
        setCurrentTheme(Themes.system);
        removeTheme();
        setManuallySelected(false);
      }
    }
  };

  return (
    <Button
      type="button"
      variant="transparent"
      class="text-Neutral-Gray-Light hover:text-Neutral-Gray text-3xl"
      onClick={handleClick}
    >
      {currentTheme() === Themes.light && <IoSunny />}
      {currentTheme() === Themes.dark && <IoMoon />}
      {currentTheme() === Themes.system && <IoSettings />}
    </Button>
  );
};
