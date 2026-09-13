import { splitProps } from "solid-js"

import * as PopoverPrimitive from "@kobalte/core/popover"

import { cn } from "~/utils/solidui"

const PopoverTrigger = PopoverPrimitive.Trigger

const Popover = (props) => {
  return <PopoverPrimitive.Root gutter={4} {...props} />;
}

const PopoverContent = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "z-50 w-72 origin-[var(--kb-popover-content-transform-origin)] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...others} />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent }
