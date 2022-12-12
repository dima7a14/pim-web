import type { Component } from "solid-js";
import { CgProfile } from "solid-icons/cg";

import { Button } from "./Button";

export type AvatarProps = {
  name: string;
};

export const Avatar: Component<AvatarProps> = (props) => {
  return (
    <div class="flex flex-row justify-start items-center">
      <div class="text-4xl p-0 mr-2 rounded-full text-Primary-Default">
        <CgProfile />
      </div>
      {props.name}
    </div>
  );
};
