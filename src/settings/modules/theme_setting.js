import { createEffect, createSignal } from "solid-js";
import { SettingTemplate } from "./setting_template";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select"
import { capitalize } from "~/utils/capitalize";

export class ThemeSetting extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading);

        this.theme = 'system'
        this.preload = true;
    }

    update() {
        const html = document.documentElement;

        switch (this.theme) {
            case 'system':
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) html.classList.add("dark")
                else html.classList.remove("dark")
                break;
            case 'dark':
                html.classList.add('dark')
                break;
            case 'light':
                html.classList.remove('dark')
                break;
        }
    }

    render() {
        const [ theme, setTheme ] = createSignal(capitalize(this.to_be_saved['theme'] || this.theme));

        createEffect(() => {
            this.to_be_saved['theme'] = theme().toLowerCase()
        })

        return (
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm">Theme</p>
                    <p class='text-xs text-gs-50'>Which theme you want.</p>
                </div>
                <Select
                    value={theme()}
                    onChange={setTheme}
                    options={['Dark', 'Light', "System"]}
                    placeholder="Select a theme..."
                    class='focus:outline-none'
                    itemComponent={(props) => <SelectItem class="text-xs" item={props.item}>{props.item.rawValue}</SelectItem>}
                    disallowEmptySelection={true}
                >
                    <SelectTrigger aria-label="Search Engine" class="text-xs h-8 w-45">
                        <SelectValue >{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                </Select>
            </div>
        )
    }
}