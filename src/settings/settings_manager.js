import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "~/components/ui/dialog"

import { createSignal, onMount, onCleanup, For } from "solid-js";
import { lsm } from "~/utils/localStorage_manager";

export class SettingManager {
    constructor() {
        this.settings = [];
    }

    load(settings_json = null) {
        if (settings_json == null) {
            for (const setting of this.settings) setting.load(lsm.getItem(setting.name) || {});
        } else {
            for (const setting of this.settings) setting.load(settings_json[setting.name] || {});
        }
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

    preload() {
        for (let setting of this.settings) {
            setting.preload_setting();
        }
    }


    export() {
        let export_obj = {}

        for (let setting of this.settings) {
            export_obj = { ...export_obj, ...setting.export_setting() }
        }

        return export_obj
    }

    render_content(type) {
        const settings = this.settings.filter(item => item.heading == type)

        return (
            <div class='h-full w-full overflow-y-auto'>
                <div class="min-h-full rounded-xl border-gs-90 border p-5">
                    <p class="uppercase tracking-widest text-xs text-gs-50 mb-4">{type}</p>
                    <div class="space-y-4">
                        <For each={settings}>
                            {(item, index) =>
                                <>
                                    {item.render()}
                                    {index() != settings.length - 1 ? <hr class='border-gs-90'></hr> : <></>}
                                </>
                            }
                        </For>
                    </div>
                </div>
            </div>
        )
    }

    save(save) {
        for (let setting of this.settings) {
            setting.save(save)
        }
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
            this.save(save)

            setOpen(!open);
        }

        const wrappedSetOpen = (val) => {
            close(false);
            setOpen(val);
        }

        return (
            <>
                <Dialog open={open()} onOpenChange={wrappedSetOpen}>
                    <DialogContent class="h-[80vh] w-[60vw] max-w-11/12 flex" onOpenAutoFocus={(e) => {
                        e.preventDefault()
                        document.activeElement.blur()
                    }}
                        onCloseAutoFocus={() => { document.getElementById("search-bar")?.focus() }}
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
                                <button onClick={() => this.save(true)} type="button" class="cursor-pointer w-full rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Save</button>
                                <button onClick={() => close(true)} type="button" class="cursor-pointer w-full rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Save and Close</button>
                            </div>
                        </DialogHeader>
                        {this.render_content(current())}
                    </DialogContent>
                </Dialog>
                <div class='fixed z-10 bottom-10 right-10 rounded-full bg-accent-50 p-4 grid place-items-center hover:cursor-pointer' onclick={() => setOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
            </>
        )
    }
}