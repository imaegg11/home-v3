import {
    Accordion,
} from "~/components/ui/accordion"

import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemLabel,
    ComboboxTrigger
} from "~/components/ui/combobox"

import { toast } from "solid-sonner";

import { CustomAccordion } from "./customAccordionItem";

import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

import { availableWidgets } from "~/widgets/widgets_map";

export function WidgetSettingRender(props) {

    const store = props.store;

    const wrappedSetStore = props.wrappedSetStore;
    
    const ALL_OPTIONS = Object.keys(availableWidgets)
    const [value, setValue] = createSignal(null)
    
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
    });

    const add_widget = (widget) => {
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

        if (xPos == null) {
            toast.error("Can't find a place for new widget (No empty spots found)")
        } else {
            wrappedSetStore("widgets", items => items.concat([new availableWidgets[widget]({
                x: xPos + 1, y: yPos + 1
            })]))
        }
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

                el.firstChild.innerHTML = `<p>${widget.constructor.name}</p><p class='text-xs text-gs-50'>${widget.settings.id}</p>`
            }

            grid.batchUpdate(false)
        } catch {
            document.getElementsByClassName('grid-stack')[0].innerHTML = ""

            toast.error("Widget positions are cooked... save and then fix json")
        }
    })

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
            <div class='grid grid-rows-1 grid-cols-[80fr_20fr] gap-2'>
                <Combobox
                    class='my-auto'
                    value={value()}
                    onChange={setValue}
                    options={ALL_OPTIONS}
                    placeholder="Search a widget..."
                    itemComponent={(props) => (
                        <ComboboxItem item={props.item} class='cursor-pointer'>
                            <ComboboxItemLabel>{props.item.rawValue} Widget</ComboboxItemLabel>
                            <ComboboxItemIndicator />
                        </ComboboxItem>
                    )}
                >
                    <ComboboxControl aria-label="Widgets">
                        <ComboboxInput />
                        <ComboboxTrigger />
                    </ComboboxControl>
                    <ComboboxContent />
                </Combobox>

                <button
                    onClick={() => value() != null && add_widget(value())}

                    type="button" class="cursor-pointer rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-2 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">
                    Add Widget
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