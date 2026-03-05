import { Show, splitProps } from "solid-js"

import * as ComboboxPrimitive from "@kobalte/core/combobox"

import { cn } from "~/utils/solidui"

const Combobox = ComboboxPrimitive.Root
const ComboboxItemLabel = ComboboxPrimitive.ItemLabel
const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect

const ComboboxItem = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
        local.class
      )}
      {...others} />
  );
}

const ComboboxItemIndicator = props => {
  const [local, others] = splitProps(props, ["children"])
  return (
    <ComboboxPrimitive.ItemIndicator {...others}>
      <Show
        when={local.children}
        fallback={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4">
            <path d="M5 12l5 5l10 -10" />
          </svg>
        }>
        {(children) => children()}
      </Show>
    </ComboboxPrimitive.ItemIndicator>
  );
}

const ComboboxSection = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitive.Section
      class={cn(
        "overflow-hidden p-1 px-2 py-1.5 text-xs font-medium text-muted-foreground ",
        local.class
      )}
      {...others} />
  );
}

const ComboboxControl = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitive.Control
      class={cn("flex h-10 items-center rounded-md border px-3", local.class)}
      {...others} />
  );
}

const ComboboxInput = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitive.Input
      class={cn(
        "flex size-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...others} />
  );
}

const ComboboxTrigger = props => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <ComboboxPrimitive.Trigger class={cn("size-4 opacity-50", local.class)} {...others}>
      <ComboboxPrimitive.Icon>
        <Show
          when={local.children}
          fallback={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4">
              <path d="M8 9l4 -4l4 4" />
              <path d="M16 15l-4 4l-4 -4" />
            </svg>
          }>
          {(children) => children()}
        </Show>
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  );
}

const ComboboxContent = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        class={cn(
          "relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          local.class
        )}
        {...others}>
        <ComboboxPrimitive.Listbox class="m-0 p-1" />
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  );
}

export {
  Combobox,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxItemIndicator,
  ComboboxSection,
  ComboboxControl,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxHiddenSelect,
  ComboboxContent
}
