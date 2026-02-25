
import { SettingTemplate } from "./setting_template";
import { onMount } from 'solid-js';

function Editor() {
    return (
        <div></div>
    )
}

export class CSSSetting extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading)

        this.content = "";
        this.preload = true;
    }

    update() {
        document.getElementById("style").innerHTML = this.content;
    }

    render() {

        return (
            <div>
                <p class="text-sm">CSS Editor</p>
                <p class='text-xs text-gs-50 mb-2'>No autocomplete or any fancy features though</p>
                <Editor></Editor>
            </div>
        )
    }
}