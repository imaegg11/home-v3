import { createUniqueId } from "solid-js"

export class WidgetTemplate {
    constructor(name, x, y, w, h) {
        this.name = name 

        this.id = createUniqueId()

        this.x = x
        this.y = y 

        this.width = w 
        this.height = h
    }
}