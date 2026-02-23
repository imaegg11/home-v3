import { splitProps } from "solid-js"

import * as AccordionPrimitive from "@kobalte/core/accordion"

import { cn } from "~/utils/solidui"

const Accordion = AccordionPrimitive.Root

const AccordionItem = props => {
  const [local, others] = splitProps(props, ["class"])
  return <AccordionPrimitive.Item class={cn("border-b", local.class)} {...others} />;
}

const AccordionTrigger = props => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitive.Header class="flex">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-2 font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-0",
          local.class
        )}
        {...others}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 shrink-0 transition-transform duration-200 -rotate-90">
          <path d="M6 9l6 6l6 -6" />
        </svg>
        {local.children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

const AccordionContent = props => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up overflow-hidden text-sm transition-all data-[expanded]:animate-accordion-down",
        local.class
      )}
      {...others}>
      <div class="pb-4 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
