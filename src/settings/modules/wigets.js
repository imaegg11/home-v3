// All things widgets (Might have to split into widgets setting and widgets manager some day... not too sure)

import { availableWidgets } from "~/widgets/all_wdgets";
import { SettingTemplate } from "./setting_template";
import { createEffect, createMemo, createSignal, on, onCleanup, onMount } from "solid-js";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
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

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

import { createStore, unwrap } from "solid-js/store";
import { toast } from "solid-sonner";

const CustomAccordion = ({ index, item, del }) => {
    return (
        <AccordionItem value={index() + ""} id={index() + ""} class="border border-gs-90 bg-bg rounded-xl">
            <AccordionTrigger class='hover:no-underline cursor-pointer px-4 overflow-hidden'>
                <div class="ml-4 flex items-center w-full justify-between text-sm overflow-hidden">
                    <div class="text-left min-w-0">
                        <p class="text-sm truncate">{index() + 1}. {item.name} Widget</p>
                        <p class="text-xs text-gs-50 truncate">ID: {item.settings.id}</p>
                    </div>
                    <button onClick={(e) => { del(); e.stopPropagation() }} type="button" class="ml-2 cursor-pointer rounded-lg border border-gs-80 bg-bg px-3 py-2 text-[0.65rem] uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">REMOVE</button>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {item.render_settings()}
            </AccordionContent>
        </AccordionItem>
    )
}

export class Widgets extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading, {
            widgets: []
        });
    }

    update() {
        this.forceUpdate()
    }

    save(shouldSave) {
        super.save(shouldSave)
        
        for (let widget of this.settings.widgets) widget.save(shouldSave)

        super.save(shouldSave)
    }

    load(data) {
        this.settings = {
            widgets: data?.widgets?.map((value) => new availableWidgets[value.name](value.settings)) || []
        }

        this.save(true)
    }

    get() {
        return {
            widgets: this.settings.widgets.map((value) => value.export_widget())
        }
    }

    wrapped_render_widgets() {
        return createMemo(
            on(this.getForceUpdate(), this.render_widgets.bind(this))
        )();
    }

    render_widgets() {
        return (
            <div id='widgets' class='grid auto-cols-[140px] auto-rows-[140px] gap-4'>
                <For each={this.settings.widgets}>
                    {(item, index) => item.render()}
                </For>
            </div>
        )
    }

    render() {
        const [store, setStore] = createStore({
            widgets: [...this.settings.widgets]
        })

        for (let setting_saved of Object.keys(this.to_be_saved)) {
            setStore(setting_saved, this.to_be_saved[setting_saved])
        }

        const wrappedSetStore = (...args) => {
            setStore(...args);

            this.to_be_saved = {
                ...this.to_be_saved,
                ...unwrap(store)
            }
        }

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

        const ALL_OPTIONS = Object.keys(availableWidgets)
        const [value, setValue] = createSignal(null)

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
            try {
                grid.removeAll()
                grid.batchUpdate()

                for (const widget of store.widgets) {
                    const el = grid.addWidget(widget.fetch_position())

                    el.firstChild.innerHTML = `<p>${widget.name}</p><p class='text-xs text-gs-50'>${widget.settings.id}</p>`
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
                <div class='grid grid-rows-1 grid-cols-[80fr_20fr]'>
                    <Combobox
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

                        type="button" class="mx-2 cursor-pointer w-full rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-2 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">Add Widget</button>
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
}