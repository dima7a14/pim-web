import type { ParentComponent, JSX } from "solid-js";
import clsx from "clsx";

export type ButtonProps = {
  type: "button" | "submit" | "reset";
  class?: string;
  onClick?: JSX.DOMAttributes<HTMLButtonElement>["onClick"];
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "danger"
    | "transparent";
  disabled?: boolean;
};

function getButtonColors(variant: Required<ButtonProps["variant"]>): string {
  switch (variant) {
    case "primary":
      return "bg-Primary-Default hover:bg-Primary-Hover text-Neutral-White";

    case "secondary":
      return "bg-Yellow-Default hover:bg-Yellow-Light text-Neutral-Black";

    case "info":
      return "bg-Green-Default hover:bg-Green-Light text-Neutral-White";

    case "danger":
      return "bg-Red-Default hover:bg-Red-Light text-Neutral-Black";

    case "transparent":
      return "";

    case "default":
    default:
      return "bg-Neutral-White hover:bg-Neutral-Gray-Lighter text-Neutral-Black";
  }
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  const buttonClass = clsx(
    "text-lg p-2 rounded-default",
    getButtonColors(props.variant),
    props.disabled ? "opacity-30 cursor-not-allowed" : "",
    props.class
  );

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      class={buttonClass}
      role="button"
      tabIndex="0"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
