import { availableWidgets } from "~/widgets/widgets_map";

import { createMemo, createSignal, Show } from "solid-js";
import { WidgetItem } from "./widgetItem";
import { useWidgetContext } from "./widgetContext";

export function WidgetList() {
    const ALL_OPTIONS = Object.keys(availableWidgets)
    const [value, setValue] = createSignal("")

    const options = createMemo(() =>
        ALL_OPTIONS.filter(item => item.toLowerCase().includes(value()))
    )

    const { setPage } = useWidgetContext()

    return (
        <div class='space-y-4'>
            <div
                onClick={() => setPage('settingRender')}
                class='flex text-xs text-gs-50 mt-2 ml-2 hover:cursor-pointer underline-animation-container w-fit [&:hover>span:nth-child(1)]:-translate-x-2'
            >
                <span class='transition-all'>←</span> <span class='underline-animation w-fit ml-2'>Back</span>
            </div>
            <div class='grid-rows-1 grid-cols-[80fr_20fr] gap-2'> {/* Add grid again if want to have the button in view*/}
                <input type="text" autoComplete="off" placeholder="Search for a widget" value={value()} onInput={(e) => setValue(e.target.value)}
                    className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                ></input>

                {/* Perhaps in the future? */}
                {/* <button
                    onClick={() => value() != null}

                    type="button" class="cursor-pointer rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-2 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">
                    Import
                </button> */}
            </div>
            <div class='space-y-2'>
                <Show when={options().length != 0} fallback={
                    <p class="w-full text-center mt-6 mb-3 text-sm text-gs-50">Uh oh, there does not to be any widgets with that name!</p>
                }>
                    <For each={options()}>
                        {item => {
                            return (
                                <WidgetItem widget={availableWidgets[item]}>

                                </WidgetItem>
                            )
                        }}
                    </For>
                </Show>
            </div>
        </div>
    )
}