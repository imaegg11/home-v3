import {
    Accordion,
} from "~/components/ui/accordion"

import { toast } from "solid-sonner";

import { CustomAccordion } from "./customAccordionItem";

import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

import { availableWidgets } from "~/widgets/widgets_map";
import { useWidgetContext } from "./widgetContext";

export function WidgetSettingRender(props) {

    const { setPage, addWidget, setAddWidget } = useWidgetContext()

    const store = props.store;
    const wrappedSetStore = props.wrappedSetStore;

    const [ isGridInit, setIsGridInit ] = createSignal(false)

    const update_pos = (item) => {
        for (let widget of store.widgets) {
            if (widget.settings.id == item.id) {
                widget.update_to_be_saved({
                    x: item.x + 1,
                    y: item.y + 1,
                    height: item.h,
                    width: item.w
                })
            }
        }
    }

    let gridRef;
    let grid;

    onMount(() => {
        grid = GridStack.init(
            {
                cellHeight: 'auto',
                margin: 2,
                float: true,
                maxRow: 3,
                column: 6
            },
            gridRef
        );

        
        grid.on("change", (event, items) => {
            items.forEach(item => {
                update_pos(item)
            });
        })
        
        setIsGridInit(true);
    });

    const add_widget = (widget) => {
        const [xPos, yPos] = check_for_space()

        if (xPos == null) {
            toast.error("Can't find a place for new widget (No empty spots found)")
        } else {
            wrappedSetStore("widgets", items => items.concat([new availableWidgets[widget]({
                x: xPos + 1, y: yPos + 1
            })]))
        }
    }

    const check_for_space = () => {
        let xPos, yPos;

        outerLoop:
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                if (grid.isAreaEmpty(j, i, 1, 1)) {
                    xPos = j;
                    yPos = i;

                    break outerLoop
                }
            }
        }

        return [xPos, yPos]
    }

    onCleanup(() => {
        grid?.destroy(false);
    });

    createEffect(() => {
        if (!grid) return

        try {
            grid.removeAll()
            grid.batchUpdate()

            for (const widget of store.widgets) {
                const el = grid.addWidget(widget.fetch_position())

                el.firstChild.innerHTML = `<p>${widget.constructor.name}</p><p class='text-[10px] text-gs-50'>${widget.settings.id}</p>`
            }

            grid.batchUpdate(false)
        } catch {
            document.getElementsByClassName('grid-stack')[0].innerHTML = ""

            toast.error("Widget positions are cooked... save and then fix json")
        }
    })

    createEffect(() => {
        if (isGridInit() && addWidget() != '') {
            add_widget(addWidget())

            setAddWidget('')
        }
    })

    const navigate = () => {
        const [xPos, yPos] = check_for_space()

        if (xPos == null) {
            toast.error("No empty slot for a new widget to go!")
        } else {
            setPage('widgetList')
        }
    }

    return (
        <div class='space-y-4'>
            <div>
                <p class="text-sm">Widgets</p>
                <p class='text-xs text-gs-50'>Little blobs to put onto your homepage.</p>
            </div>
            <div>
                <div class="grid-stack mt-2 border border-gs-90 rounded" ref={gridRef}>
                </div>
            </div>
            <div class='w-full'>
                <button
                    onClick={navigate}

                    type="button" class="flex gap-2 items-center justify-center w-full cursor-pointer rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-2 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">
                    Add Widgets

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
            </div>
            <div class="flex justify-center">
                <Accordion multiple={false} collapsible class=" mx-2 w-full space-y-4">
                    <For each={store.widgets}>
                        {(item, index) => <CustomAccordion index={index} item={item} del={() => wrappedSetStore("widgets", items => items.filter((_, i) => i !== index()))}></CustomAccordion>}
                    </For>
                    <Show when={store.widgets.length == 0}>
                        <p class="w-full text-center mt-6 mb-3 text-sm text-gs-50">No widgets found! Try adding one?</p>
                    </Show>
                </Accordion>
            </div>
        </div>
    )
}