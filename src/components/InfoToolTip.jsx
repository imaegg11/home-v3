import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { children, mergeProps } from "solid-js";

export function InfoToolTip(props) {
    const merged = mergeProps(
        {
            width: "12",
            stroke: "2",
        },
        props
    )

    const resolved = children(() => merged.children);

    return (
        <Tooltip placement="top">
            <TooltipTrigger><svg xmlns="http://www.w3.org/2000/svg" width={merged.width} height={merged.width} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={merged.stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></TooltipTrigger>
            <TooltipContent class='mb-2 max-w-md'>{resolved()}</TooltipContent>
        </Tooltip>

    )
}