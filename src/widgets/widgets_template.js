import { createStore, unwrap } from "solid-js/store"
import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch"
import { capitalize } from "~/utils/capitalize"
import { nanoid } from 'nanoid';
import { ErrorBoundary } from "solid-js";

export class WidgetTemplate {
    constructor(name, settings) {
        this.name = name

        this.settings = {
            id: nanoid(10),
            height: 1,
            width: 1,
            ...settings
        }

        this.to_be_saved = {}
        this.details = {}
    }

    fetch_position() {
        return {
            id: this.settings.id,
            x: (this.to_be_saved.x || this.settings.x) - 1,
            y: (this.to_be_saved.y || this.settings.y) - 1,
            h: (this.to_be_saved.height || this.settings.height),
            w: (this.to_be_saved.width || this.settings.width)
        }
    }

    export_widget() {
        return {
            name: this.name,
            settings: this.settings
        }
    }

    save(shouldSave) {
        if (!shouldSave) {
            this.to_be_saved = {}
            return
        }

        this.settings = {
            ...this.settings,
            ...this.to_be_saved
        }

        this.to_be_saved = {}
    }

    update_to_be_saved(update) {
        this.to_be_saved = {
            ...this.to_be_saved,
            ...update
        }
    }

    render_content() { }

    render() {
        return (
            <div class='[&>div]:h-full [&>div]:rounded-md [&>div]:overflow-auto' style={{
                "grid-column": `${this.settings.x} / span ${this.settings.width}`,
                "grid-row": `${this.settings.y} / span ${this.settings.height}`,
            }}>
                <ErrorBoundary fallback={<div class='bg-accent-80 grid place-items-center rounded-md text-center'>Something went wrong....</div>}>
                    {this.render_content()}
                </ErrorBoundary>
            </div>
        )
    }

    render_settings() {
        const [store, setStore] = createStore({
            ...this.settings,
            ...this.to_be_saved
        })

        const wrappedSetStore = (...args) => {
            setStore(...args)

            this.to_be_saved = {
                ...this.to_be_saved,
                ...unwrap(store)
            }
        }

        const boolInput = (name) => {
            return (
                <div class="flex items-center justify-between mt-4 mx-2">
                    <div>
                        <Show when={this.details[name] != null}>
                            <p class="text-sm">{this.details[name].text}</p>
                            <p class='text-xs text-gs-50'>{this.details[name].description}</p>
                        </Show>

                        <Show when={this.details[name] == null}>
                            <p class="text-sm">{capitalize(name)}</p>
                        </Show>
                    </div>
                    <Switch checked={store[name]} onChange={(val) => wrappedSetStore(name, val)}>
                        <SwitchControl>
                            <SwitchThumb />
                        </SwitchControl>
                    </Switch>
                </div>
            )
        }

        const textInput = (name) => {
            return (
                <div class='space-y-2'>
                    <div class='w-full'>
                        <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2 flex gap-2 items-center'>{name.toUpperCase()}</p>
                        <input type="text" autoComplete="off" placeholder={name.toUpperCase()} onInput={(val) => wrappedSetStore(name, val.data)} value={store[name]}
                            className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                        ></input>
                    </div>
                </div>
            );
        }

        return (
            <div class='p-4 pt-0'>
                <hr class='border-gs-90 mb-4'></hr>
                <For each={Object.keys(store)}>
                    {(item, index) => {
                        if (!['x', 'y', 'height', 'width', 'id'].includes(item)) {
                            switch (typeof store[item]) {
                                case "boolean":
                                    return boolInput(item)

                                case "string":
                                    return textInput(item)
                            }
                        }
                    }}
                </For>
            </div>
        )
    }
}