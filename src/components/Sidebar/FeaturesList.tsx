import type { Component } from "solid-js";
import { A, useMatch } from "@solidjs/router";
import { clsx } from "clsx";

import { features, Feature } from "../../constants/features";

const FeatureLink: Component<{ feature: Feature }> = (props) => {
  const match = useMatch(() => props.feature.path);

  return (
    <A
      href={props.feature.path}
      class={clsx(
        "py-3 font-bold flex flex-row flex-nowrap items-center",
        Boolean(match()) ? "text-red-400" : "text-gray-500 dark:text-gray-300"
      )}
    >
      <props.feature.Icon class="mr-3" />
      {props.feature.label}
    </A>
  );
};

export const FeaturesList: Component = () => {
  return (
    <div class="px-6 py-3 ">
      <h5 class="font-normal text-gray-400 uppercase">Features</h5>
      {Object.values(features).map((feature) => (
        <FeatureLink feature={feature} />
      ))}
    </div>
  );
};
