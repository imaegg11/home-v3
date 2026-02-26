
import { SettingTemplate } from "./setting_template";
import CodeFlask from "codeflask";
import { createSignal, onMount } from 'solid-js';

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

        const [content, setContent] = createSignal(this.to_be_saved['content'] || this.content)

        onMount(() => {
            const editorElem = document.getElementById('editor');
            const flask = new CodeFlask(editorElem, { language: 'css' });

            flask.updateCode(content())

            flask.onUpdate((code) => {
                this.to_be_saved['content'] = code;

                setContent(code);
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