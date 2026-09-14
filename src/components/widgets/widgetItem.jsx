export function WidgetItem(props) {
    const widget = props.widget;

    return (
        <div class="relative h-34 rounded-md border-gs-90 border p-3">
            <div class='flex justify-between items-center'>
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
            <p class='mt-1 text-sm line-clamp-2'>{widget.description}</p>
            <p class='absolute bottom-3 text-xs text-gs-50 ml-4 hover:cursor-pointer underline-animation-container w-fit [&:hover>span:nth-child(2)]:pl-2'>
                <span class='underline-animation w-fit mr-2'>View</span> <span class='transition-all'>→</span>
            </p>
        </div>
    )
}