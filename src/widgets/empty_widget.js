import WidgetTemplate from "./widgets_template"

export default class EmptyWidget extends WidgetTemplate {
    static name = "Empty";
    static description = "An completely empty widget"
    static version = "1.0"
    static last_modified = new Date("2026-09-14")
    
    constructor(settings) {
        super({
            ...settings,
        })
    }

}