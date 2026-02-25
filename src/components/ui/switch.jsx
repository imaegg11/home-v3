import { splitProps } from "solid-js"

import * as SwitchPrimitive from "@kobalte/core/switch"

import { cn } from "~/utils/solidui"

const Switch = SwitchPrimitive.Root
const SwitchDescription = SwitchPrimitive.Description
const SwitchErrorMessage = SwitchPrimitive.ErrorMessage

const SwitchControl = props => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <>
      <SwitchPrimitive.Input
        class={cn(
          "[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-2 [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background",
          local.class
        )} />
      <SwitchPrimitive.Control
        class={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-[color,background-color,box-shadow] data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[disabled]:opacity-50",
          local.class
        )}
        {...others}>
        {local.children}
      </SwitchPrimitive.Control>
    </>
  );
}

const SwitchThumb = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <SwitchPrimitive.Thumb
      class={cn(
        "pointer-events-none block size-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-5",
        local.class
      )}
      {...others} />
  );
}

const SwitchLabel = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <SwitchPrimitive.Label
      class={cn(
        "text-sm font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        local.class
      )}
      {...others} />
  );
}

export { Switch, SwitchControl, SwitchThumb, SwitchLabel, SwitchDescription, SwitchErrorMessage }
