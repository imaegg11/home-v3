import { createEffect } from "solid-js";
import { SettingTemplate } from "./setting_template";
import { createStore } from "solid-js/store";

export class BackgroundSetting extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading, {
            bg: ""
        })

        this.preload = true
    }

    update() {
        document.body.style.backgroundImage = `url('${this.settings.bg}')`;
    }

    render() {
        const [store, setStore] = createStore({
            ...this.settings,
            ...this.to_be_saved
        })
        
        createEffect(() => {
            this.to_be_saved.bg = store.bg
        })

        return (
            <div class="space-y-2">
                <div class="">
                    <p class="text-sm">Background Image</p>
                    <p class='text-xs text-gs-50'>URL to be set as the background image.</p>
                </div>
                <input type="text" autoComplete="off" placeholder="Background URL..." value={store.bg} onInput={(e) => setStore("bg", e.target.value)}
                    className="text-sm text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                ></input>
            </div>
        )
    }
}