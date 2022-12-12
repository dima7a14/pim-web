import type { ParentComponent } from "solid-js";
import clsx from "clsx";

import { Button, ButtonProps } from "./Button";

export type FloatButtonProps = ButtonProps & {
  position?: "absolute" | "fixed";
};

export const FloatButton: ParentComponent<FloatButtonProps> = (props) => {
  const className = clsx(
    props.class,
    "z-10",
    props.position === "fixed" ? "fixed" : "absolute"
  );

  return (
    <Button {...props} class={className}>
      {props.children}
    </Button>
  );
};
