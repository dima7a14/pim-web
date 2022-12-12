import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
} from "@tanstack/solid-table";
import { BiRegularChevronLeft, BiRegularChevronRight } from "solid-icons/bi";
import { AiOutlinePlus } from "solid-icons/ai";

import { Avatar } from "../../components/Avatar";
import { FloatButton } from "../../components/FloatButton";
import { Button } from "../../components/Button";
import type { FeatureRequest } from "./models";

const columns: ColumnDef<FeatureRequest>[] = [
  {
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "author",
    cell: (info) => <Avatar name={info.getValue() as string} />,
  },
];

export type RequestsTableProps = {
  requests: FeatureRequest[];
};

export const RequestsTable: Component<RequestsTableProps> = (props) => {
  const table = createSolidTable({
    get data() {
      return props.requests;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="bg-Neutral-White dark:bg-Neutral-Black rounded-default shadow-card-floating relative">
      <table class="overflow-hidden rounded-t-default">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th class="bg-opacity-20 bg-Neutral-Divider dark:bg-Neutral-Gray py-5 px-6 font-bold text-left border-b border-b-Neutral-Divider dark:border-b-Neutral-Gray">
                      <Show when={!header.isPlaceholder}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Show>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="py-5 px-6 border-b border-b-Neutral-Divider dark:border-b-Neutral-Gray">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <div class="p-6 flex flex-row flex-nowrap items-center">
        <Button
          type="button"
          disabled
          class="border-2 border-Neutral-Divider rounded-sm w-8 h-8 leading-none p-0 text-xl mr-1"
        >
          <BiRegularChevronLeft class="mx-auto" />
        </Button>
        <Button
          type="button"
          variant="primary"
          class="border-2 border-Primary-Default rounded-sm w-8 h-8 leading-none p-0 mr-1"
        >
          1
        </Button>
        <Button
          type="button"
          class="border-2 border-Neutral-Divider rounded-sm w-8 h-8 leading-none p-0 mr-1"
        >
          2
        </Button>
        <Button
          type="button"
          class="border-2 border-Neutral-Divider rounded-sm w-8 h-8 leading-none p-0 mr-1"
        >
          3
        </Button>
        <Button
          type="button"
          class="border-2 border-Neutral-Divider rounded-sm w-8 h-8 leading-none p-0 text-xl"
        >
          <BiRegularChevronRight class="mx-auto" />
        </Button>
      </div>
      <FloatButton
        type="button"
        variant="info"
        class="rounded-full text-5xl p-2 -bottom-2 -right-4 shadow-button-accent-default hover:shadow-button-accent-hover active:shadow-button-accent-pressed"
      >
        <AiOutlinePlus />
      </FloatButton>
    </div>
  );
};
