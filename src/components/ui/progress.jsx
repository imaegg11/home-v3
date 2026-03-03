import { splitProps } from "solid-js"

import * as ProgressPrimitive from "@kobalte/core/progress"

import { Label } from "~/components/ui/label"

const Progress = props => {
  const [local, others] = splitProps(props, ["children"])
  return (
    <ProgressPrimitive.Root {...others}>
      {local.children}
      <ProgressPrimitive.Track class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <ProgressPrimitive.Fill
          class="h-full w-[var(--kb-progress-fill-width)] flex-1 bg-primary transition-all" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

const ProgressLabel = (props) => {
  return <ProgressPrimitive.Label as={Label} {...props} />;
}

const ProgressValueLabel = (props) => {
  return <ProgressPrimitive.ValueLabel as={Label} {...props} />;
}

export { Progress, ProgressLabel, ProgressValueLabel }
