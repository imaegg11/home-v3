import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "~/components/ui/dialog"

import { createSignal, onMount, onCleanup } from "solid-js";

export class SettingManager {
    constructor() {
        this.settings = [];
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

    dialog() {
        const [open, setOpen] = createSignal(false);

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

        return (
            <Dialog open={open()} onOpenChange={setOpen}>
                <DialogContent class="h-[80vh] w-[60vw] max-w-11/12">
                    <DialogHeader>
                        <div class='flex items-start justify-between gap-4'>
                            <div>
                                <p class='text-gs-50 text-xs uppercase tracking-widest mb-0'>SETTINGS</p>
                                <p class='text-xl mb-0'>Homepage Preferences</p>
                                <p class='text-gs-50 text-xs'>
                                    Configure how your homepage looks and feels.
                                </p>
                            </div>
                            <button onClick={() => setOpen(!open())} type="button" class="rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Close</button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                Bum
            </div>
        )
    }
}