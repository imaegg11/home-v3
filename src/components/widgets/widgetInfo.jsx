import { marked } from "marked";
export function WidgetInfo(props) {
    const widget = props.widget;

    return (
        <div>
            <div class='flex justify-between items-center mb-2'>
                <div>
                    <p class="tracking-wide">{widget.name}</p>
                    <p class='text-gs-50 text-xs'>Version: {widget.version} - {widget.last_modified.toLocaleDateString()}</p>
                </div>
                <div class='mr-4'>
                    <button
                        type="button" class="cursor-pointer rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-1.5 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">
                        Add
                    </button>
                </div>
            </div>
            <div class='mt-2 text-sm *:[all:revert] [&_:is(h1,h2,h3)]:text-accent-30 [&_li]:list-["-"] [&_li]:pl-4 [&_p]:leading-relaxed' innerHTML={marked.parse(widget.description)}/>
        </div>
    )
}