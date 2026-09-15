// All things widgets (Might have to split into widgets setting and widgets manager some day... not too sure)

import { availableWidgets } from "~/widgets/widgets_map";
import { SettingTemplate } from "./setting_template";
import { createMemo, createSignal, on } from "solid-js";

import { createStore, unwrap } from "solid-js/store";
import { hasSameStructure } from "~/utils/hasSameStructure";

import { WidgetSettingRender } from "~/components/widgets/widgetSetting"
import { WidgetList } from "~/components/widgets/widgetList";
import { WidgetInfo } from "~/components/widgets/widgetInfo";
import { Dynamic } from "solid-js/web";
import { WidgetContextProvider } from "~/components/widgets/widgetContext";

export class Widgets extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading, {
            widgets: []
        });
    }

    update() {
        this.forceUpdate()
    }

    // todo: update to have each widget do it's own verification for future since they may also have arrays
    verify(imp) {
        for (let widget of imp["widgets"]) {
            if (!Object.keys(availableWidgets).includes(widget.name)) continue

            const r = hasSameStructure(new availableWidgets[widget.name]().export_widget(), widget)

            if (!r) return false
        }

        return true
    }

    save(shouldSave) {
        super.save(shouldSave)

        for (let widget of this.settings.widgets) widget.save(shouldSave)

        super.save(shouldSave)
    }

    load(data) {
        this.settings = {
            widgets: data?.widgets?.map((value) => new availableWidgets[value.name](value.settings)) || []
        }

        this.save(true)
    }

    get() {
        return {
            widgets: this.settings.widgets.map((value) => value.export_widget())
        }
    }

    wrapped_render_widgets() {
        return createMemo(
            on(this.getForceUpdate(), this.render_widgets.bind(this))
        )();
    }

    render_widgets() {
        return (
            <div id='widgets' class='grid auto-cols-35 auto-rows-35 gap-4'>
                <For each={this.settings.widgets}>
                    {(item, index) => item.render()}
                </For>
            </div>
        )
    }

    render() {
        const [store, setStore] = createStore({
            widgets: [...this.settings.widgets]
        })

        for (let setting_saved of Object.keys(this.to_be_saved)) {
            setStore(setting_saved, this.to_be_saved[setting_saved])
        }

        const wrappedSetStore = (...args) => {
            setStore(...args);

            this.to_be_saved = {
                ...this.to_be_saved,
                ...unwrap(store)
            }
        }

        const [page, setPage] = createSignal('settingRender')


        const pages = {
            'settingRender': WidgetSettingRender,
            'widgetList': WidgetList,
            'widgetInfo': WidgetInfo
        }

        return (
            <WidgetContextProvider page={page} setPage={setPage}>
                <Dynamic component={
                    pages[page()]
                }
                    store={store}
                    wrappedSetStore={wrappedSetStore}
                ></Dynamic>
            </WidgetContextProvider>
        )
    }
}