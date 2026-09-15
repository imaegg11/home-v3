import { marked } from "marked";
import { useWidgetContext } from "./widgetContext";
import { availableWidgets } from "~/widgets/widgets_map";

export function WidgetInfo(props) {
    const { currentWidget, setPage, wrappedSetAddWidget } = useWidgetContext() 

    const widget = availableWidgets[currentWidget()]

    return (
        <div>
            <div
                onClick={() => setPage('widgetList')}
                class='flex text-xs text-gs-50 my-2 ml-2 hover:cursor-pointer underline-animation-container w-fit [&:hover>span:nth-child(1)]:-translate-x-2'
            >
                <span class='transition-all'>←</span> <span class='underline-animation w-fit ml-2'>Back</span>
            </div>
            <div class='flex justify-between items-center mb-2'>
                <div>
                    <p class="tracking-wide">{widget.name}</p>
                    <p class='text-gs-50 text-xs'>Version: {widget.version} - {widget.last_modified.toLocaleDateString()}</p>
                </div>
                <div class='mr-4'>
                    <button
                        onClick={() => wrappedSetAddWidget(widget.name)}
                        type="button" class="cursor-pointer rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-1.5 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">
                        Add
                    </button>
                </div>
            </div>
            <div class='mt-2 text-sm *:[all:revert] [&_:is(h1,h2,h3)]:text-accent-30 [&_li]:list-["-"] [&_li]:pl-4 [&_p]:leading-relaxed' innerHTML={marked.parse(widget.description)} />
        </div>
    )
}