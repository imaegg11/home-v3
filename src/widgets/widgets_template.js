import { createUniqueId } from "solid-js"

export class WidgetTemplate {
    constructor(name, settings) {
        this.name = name 

        this.settings = {
            id: createUniqueId,
            ...settings
        }
    }
}