import type { Component } from "solid-js";
import { IoNotifications } from "solid-icons/io";

import { Button } from "../Button";

export type NotificationsProps = {};

export const Notifications: Component<NotificationsProps> = (props) => {
  return (
    <Button
      type="button"
      disabled
      variant="transparent"
      class="text-Neutral-Gray-Light hover:text-Neutral-Gray text-3xl"
    >
      <IoNotifications />
    </Button>
  );
};
