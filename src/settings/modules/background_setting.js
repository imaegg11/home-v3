import { createEffect, createSignal } from "solid-js";
import { SettingTemplate } from "./setting_template";

export class BackgroundSetting extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading)

        this.bg = ""
        this.preload = true
    }

    update() {
        document.body.style.backgroundImage = `url('${this.bg}')`;
    }

    render() {
        const [bg, setBG] = createSignal(this.bg);

        createEffect(() => {
            this.to_be_saved['bg'] = bg()
        })

        return (
            <div class="space-y-2">
                <div>
                    <div class="mb-2">
                        <p class="text-sm">Background Image</p>
                        <p class='text-xs text-gs-50'>URL to be set as the background image.</p>
                    </div>
                    <input type="text" autoComplete="off" placeholder="Background URL..." value={bg()} onInput={(e) => setBG(e.target.value)}
                        className="text-sm text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                    ></input>
                </div>
            </div>
        )
    }
}