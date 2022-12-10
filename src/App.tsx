import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";

import { features } from "./constants/features";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { NotFound } from "./components/NotFound";

const App: Component = () => {
  return (
    <div class="bg-Neutral-Background dark:bg-Neutral-Gray-Dark text-Neutral-Black dark:text-Neutral-White w-screen h-screen flex flex-row flex-nowrap">
      <Sidebar />
      <section class="flex-1 px-9 py-6">
        <div class="mb-8">
          <Header />
        </div>
        <Routes>
          {Object.values(features).map((feature) => (
            <Route path={feature.path} component={feature.component} />
          ))}
          <Route path="/*" component={NotFound} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
