import { splitProps } from "solid-js";

import * as TooltipPrimitive from "@kobalte/core/tooltip"

import { cn } from "~/utils/solidui"

const TooltipTrigger = TooltipPrimitive.Trigger

const Tooltip = (props) => {
  return <TooltipPrimitive.Root gutter={4} {...props} />;
}

const TooltipContent = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "z-50 origin-[var(--kb-popover-content-transform-origin)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          local.class
        )}
        {...others} />
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent }
