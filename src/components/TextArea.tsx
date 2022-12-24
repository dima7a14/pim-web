import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import type { IconTypes } from "solid-icons";
import clsx from "clsx";

export type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  Icon?: IconTypes;
};

export const TextArea: Component<TextAreaProps> = (props) => {
  const [iconProps, textAreaProps] = splitProps(props, ["Icon"]);

  return (
    <div class="relative w-full h-full">
      <Show when={iconProps.Icon} keyed>
        {(Icon) => (
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-Neutral-Gray">
            <Icon />
          </div>
        )}
      </Show>
      <textarea
        {...textAreaProps}
        class={clsx(
          "bg-Neutral-White rounded-3xl py-3 pr-4 text-sm text-Neutral-Gray-dark resize-none",
          iconProps.Icon ? "pl-10" : "pl-4",
          props.class
        )}
      />
    </div>
  );
};
