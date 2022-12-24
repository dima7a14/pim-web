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
      class="text-gray-400 hover:text-gray-500 text-3xl ml-2"
    >
      <IoNotifications />
    </Button>
  );
};
