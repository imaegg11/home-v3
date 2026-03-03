
import { SettingTemplate } from "./setting_template";
import CodeFlask from "codeflask";
import { onMount } from 'solid-js';
import { createStore } from "solid-js/store";

export class CSSSetting extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading, {
            content: ""
        })

        this.preload = true;
    }

    update() {
        document.getElementById("style").innerHTML = this.settings.content;
    }

    render() {
        const [store, setStore] = createStore({
            ...this.settings,
            ...this.to_be_saved
        })

        onMount(() => {
            const editorElem = document.getElementById('editor');
            const flask = new CodeFlask(editorElem, { language: 'css' });

            flask.updateCode(store.content)

            flask.onUpdate((code) => {
                this.to_be_saved.contents = code;

                setStore("content", code);
            })
        })

        return (
            <div>
                <p class="text-sm">CSS Editor</p>
                <p class='text-xs text-gs-50 mb-2'>No autocomplete or any fancy features though</p>
                <div id='editor'></div>
            </div>
        )
    }
}