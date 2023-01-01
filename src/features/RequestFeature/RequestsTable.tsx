import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
} from "@tanstack/solid-table";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogPanel,
  Transition,
  TransitionChild,
} from "solid-headless";
import { BiRegularChevronLeft, BiRegularChevronRight } from "solid-icons/bi";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "solid-icons/ai";
import { VsChromeClose } from "solid-icons/vs";
import clsx from "clsx";

import { Avatar } from "../../components/Avatar";
import { FloatButton } from "../../components/FloatButton";
import { Button } from "../../components/Button";
import type { FeatureRequest } from "./models";
import { RequestFeatureForm } from "./RequestFeatureForm";

export type RequestsTableProps = {
  requests: FeatureRequest[];
};

export const RequestsTable: Component<RequestsTableProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [selectedFeature, setSelectedFeature] = createSignal<
    FeatureRequest | undefined
  >();
  const dialogValues = () => {
    const values = selectedFeature();

    if (!values) {
      return undefined;
    }

    return {
      name: values.name,
      description: values.description,
      done: values.done,
    };
  };

  function openDialog(feature?: FeatureRequest) {
    setSelectedFeature(feature);
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
    setSelectedFeature(undefined);
  }

  const columns: ColumnDef<FeatureRequest>[] = [
    {
      accessorKey: "name",
      header: () => "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "description",
      header: () => "Description",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "author",
      header: () => "Author",
      cell: (info) => <Avatar name={info.getValue() as string} />,
    },
    {
      id: "actions",
      header: () => "Actions",
      cell: (info) => (
        <div class="flex flex-row flex-wrap justify-end items-center w-20">
          <Button
            type="button"
            variant="info"
            class="rounded-full p-2"
            disabled={info.row.original.done}
            onClick={() => openDialog(info.row.original)}
          >
            <AiFillEdit />
          </Button>
          <Button
            type="button"
            disabled
            variant="danger"
            class="rounded-full p-2 ml-2"
          >
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
  ];

  const table = createSolidTable({
    get data() {
      return props.requests;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="bg-white dark:bg-black rounded-md shadow-xl relative">
      <table class="overflow-hidden rounded-t-md w-full">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th class="bg-opacity-20 bg-gray-200 dark:bg-gray-400-dark py-5 px-6 font-bold text-left border-b border-b-gray-200 dark:border-b-gray-400">
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
              <tr class={clsx(row.original.done && "line-through")}>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="py-5 px-6 border-b border-b-gray-200 dark:border-b-gray-400">
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
          class="border-2 rounded-md w-8 h-8 leading-none p-0 text-xl mr-1"
        >
          <BiRegularChevronLeft class="mx-auto" />
        </Button>
        <Button
          type="button"
          variant="primary"
          class="border-2 rounded-md w-8 h-8 leading-none p-0 mr-1"
        >
          1
        </Button>
        <Button
          type="button"
          class="border-2 rounded-md w-8 h-8 leading-none p-0 mr-1"
        >
          2
        </Button>
        <Button
          type="button"
          class="border-2 rounded-md w-8 h-8 leading-none p-0 mr-1"
        >
          3
        </Button>
        <Button
          type="button"
          class="border-2 rounded-md w-8 h-8 leading-none p-0 text-xl"
        >
          <BiRegularChevronRight class="mx-auto" />
        </Button>
      </div>
      <FloatButton
        type="button"
        variant="info"
        class="rounded-full text-5xl p-2 -bottom-2 -right-4 shadow-md hover:shadow-lg active:shadow"
        onClick={() => openDialog()}
      >
        <AiOutlinePlus />
      </FloatButton>
      <Transition appear show={isOpen()}>
        <Dialog
          isOpen
          class="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDialog}
        >
          <div class="min-h-screen p-4 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50" />
            </TransitionChild>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel class="inline-block relative w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-2xl rounded-md dark:border dark:border-gray-800">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-bold text-black dark:text-gray-300"
                >
                  Request a New Feature
                </DialogTitle>
                <div class="mt-6">
                  <RequestFeatureForm
                    initialValues={dialogValues()}
                    onSubmit={(values) => console.log(values)}
                  />
                </div>
                <div class="absolute z-10 top-2 right-2">
                  <Button
                    type="button"
                    variant="transparent"
                    onClick={closeDialog}
                  >
                    <VsChromeClose />
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
