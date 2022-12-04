import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { features } from "./constants/features";
import { Sidebar } from "./components/Sidebar";
import { NotFound } from "./components/NotFound";

const App: Component = () => {
  return (
    <div class="bg-Neutral-Background w-screen h-screen flex flex-row flex-nowrap">
      <Sidebar />
      <div>
        <Routes>
          {Object.values(features).map((feature) => (
            <Route path={feature.path} component={feature.component} />
          ))}
          <Route path="/*" component={NotFound} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
