import { WidgetTemplate } from "./widgets_template";

export class EmptyWidget extends WidgetTemplate {
    constructor(settings) {
        super("Empty", {
            ...settings,
        })
    }
}