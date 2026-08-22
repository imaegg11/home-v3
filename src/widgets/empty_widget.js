import WidgetTemplate from "./widgets_template"

export default class EmptyWidget extends WidgetTemplate {
    static name = "Empty";
    
    constructor(settings) {
        super({
            ...settings,
        })
    }

}