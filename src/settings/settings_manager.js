import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "~/components/ui/dialog"

import { createSignal, onMount, onCleanup, For } from "solid-js";

export class SettingManager {
    constructor() {
        this.settings = [];
    }

    load() {
        for (const setting of this.settings) setting.load();
    }

    add(setting) {
        if (this.get(setting.name) == null) this.settings.push(setting);
    }

    get(setting_name) {
        let result = null;

        for (let setting of this.settings) {
            if (setting.name == setting_name) {
                result = setting;
                break;
            }
        }

        return result;
    }

    render_content(type) {
        const settings = this.settings.filter(item => item.heading == type)

        return (
            <div class='h-full w-full overflow-y-auto'>
                <div class="min-h-full rounded-xl border-gs-90 border p-5">
                    <p class="uppercase tracking-widest text-xs text-gs-50 mb-4">{type}</p>
                    <For each={settings}>
                        {(item, index) =>
                            <div>
                                {item.render()}
                                {index() != settings.length - 1 ? <hr class='border-gs-90'></hr> : <></>}
                            </div>
                        }
                    </For>
                </div>
            </div>
        )
    }

    render() {
        const [open, setOpen] = createSignal(false);
        const [current, setCurrent] = createSignal(this.settings[0].heading);

        onMount(() => {
            const toggleSettings = (e) => {
                if (e.key === '.' && e.ctrlKey) {
                    setOpen(!open());
                }
            }

            window.addEventListener("keyup", toggleSettings);

            onCleanup(() => {
                window.removeEventListener("keyup", toggleSettings);
            });
        })

        const close = (save) => {
            if (save) {
                for (let setting of this.settings) {
                    setting.save()
                }
            }

            setOpen(!open);
        }

        return (
            <Dialog open={open()} onOpenChange={setOpen}>
                <DialogContent class="h-[80vh] w-[60vw] max-w-11/12 flex" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }}
                    onCloseAutoFocus={() => document.getElementById("search-bar")?.focus()}
                >
                    <DialogHeader>
                        <div class='flex items-start justify-between gap-4 h-min mb-4'>
                            <div>
                                <p class='text-gs-50 text-xs uppercase tracking-widest mb-0'>SETTINGS</p>
                                <p class='text-xl mb-0'>Homepage Preferences</p>
                                <p class='text-gs-50 text-xs'>
                                    Configure how your homepage looks and feels.
                                </p>
                            </div>
                        </div>
                        <div class='space-y-2'>
                            <For each={[...new Set(this.settings.map(item => item.heading))]}>
                                {(item, index) => {
                                    return (
                                        <p class={`${item == current() ? "border-text border-l-2" : "text-gs-50"} pl-2 cursor-pointer hover:text-text transition-colors`} onclick={() => { setCurrent(item) }}>
                                            {item}
                                        </p>
                                    )
                                }}
                            </For>
                        </div>
                        <div class="mt-auto space-y-2">
                            <button onClick={() => close(false)} type="button" class="cursor-pointer w-full rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Close</button>
                            <button onClick={() => close(true)} type="button" class="cursor-pointer w-full rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Save and Close</button>
                        </div>
                    </DialogHeader>
                    {this.render_content(current())}
                </DialogContent>
            </Dialog>
        )
    }
}