import type { Component } from "solid-js";
import { Show } from "solid-js";
import { createForm, Form, Field, zodForm } from "@modular-forms/solid";
import { z } from "zod";

import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";

const scheme = z.object({
  name: z
    .string()
    .min(5, "Feature name must have at least 5 characters or more.")
    .max(255, "Feature name is too big."),
  description: z.string().optional(),
  done: z.boolean().default(false),
});

type RequestFeatureForm = z.infer<typeof scheme>;

export type RequestFeatureFormProps = {
  initialValues?: RequestFeatureForm;
  onSubmit(values: RequestFeatureForm): void;
};

export const RequestFeatureForm: Component<RequestFeatureFormProps> = (
  props
) => {
  const form = createForm<RequestFeatureForm>({
    initialValues: props.initialValues,
    validate: zodForm(scheme),
  });

  return (
    <Form
      of={form}
      onSubmit={props.onSubmit}
      class="flex flex-col items-center"
    >
      <Field of={form} name="name">
        {(field) => (
          <div class="mb-4 w-full">
            <Input
              type="text"
              placeholder="Name"
              class="border border-gray-400-dark rounded-md w-full"
              {...field.props}
              value={field.value}
            />
            <Show when={field.error}>
              <div class="px-2 py-1 mt-1 rounded-md bg-red-400 text-white">
                {field.error}
              </div>
            </Show>
          </div>
        )}
      </Field>
      <Field of={form} name="description">
        {(field) => (
          <div class="mb-4 w-full">
            <TextArea
              placeholder="Description"
              rows={3}
              class="border border-gray-500 rounded-md w-full"
              {...field.props}
              value={field.value}
            />
            <Show when={field.error}>
              <div class="px-2 py-1 mt-1 rounded-md bg-red-400 text-white">
                {field.error}
              </div>
            </Show>
          </div>
        )}
      </Field>
      <Field of={form} name="done">
        {(field) => (
          <div class="mb-4 w-full">
            <div class="form-check">
              <input
                {...field.props}
                class="form-check-input h-4 w-4 border border-gray-400 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                id="doneField"
                disabled={!props.initialValues}
                checked={field.value}
              />
              <label
                class="form-check-label inline-block text-gray-500 cursor-pointer"
                for="doneField"
              >
                Done?
              </label>
            </div>
            <Show when={field.error}>
              <div class="px-2 py-1 mt-1 rounded-md bg-red-400 text-white">
                {field.error}
              </div>
            </Show>
          </div>
        )}
      </Field>
      <Button type="submit" variant="primary" class="px-4 py-2 rounded-md">
        Submit
      </Button>
    </Form>
  );
};
