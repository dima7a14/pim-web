import type { Component } from "solid-js";

import { Sidebar } from "./components/Sidebar";

const App: Component = () => {
  return (
    <div class="bg-Neutral-Background w-screen h-screen flex flex-row flex-nowrap">
      <Sidebar />
      <div>Content</div>
    </div>
  );
};

export default App;
