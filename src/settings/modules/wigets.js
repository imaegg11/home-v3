// All things widgets (Might have to split into widgets setting and widgets manager some day... not too sure)

import { availableWidgets } from "~/widgets/all_wdgets";
import { SettingTemplate } from "./setting_template";
import { createMemo, on } from "solid-js";

export class Widgets extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading, {
            widgets: []
        });
    }

    update() {
        this.settings.widgets = []

        let t = availableWidgets['progress']
        this.settings.widgets.push(new t(1, 1, 1, 1))

        this.settings.widgets.push(new t(4, 2, 1, 1))

        this.forceUpdate()
    }

    wrapped_render_widgets() {
        return createMemo(
            on(this.getForceUpdate(), this.render_widgets.bind(this))
        )();
    }

    render_widgets() {
        return (
            <div id='widgets' class='grid auto-cols-[140px] auto-rows-[140px] gap-4'>
                <For each={this.settings.widgets}>
                    {(item, index) => item.render()}
                </For>
            </div>
        )
    }

    render() {
        return (
            <div>
                <p class='text-center text-sm'>Nothing to see for now</p>
            </div>
        )
    }
}