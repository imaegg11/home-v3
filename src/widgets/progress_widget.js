import { WidgetTemplate } from "./widgets_template"

export class ProgressWidget extends WidgetTemplate {
    constructor(x, y, w = 1, h = 1) {
        super("Progress", x, y, w, h)
    }

    render() {

        return (
            <div
                class="bg-accent-70 rounded-md"
                style={{
                    "grid-column": `${this.x} / span ${this.width}`,
                    "grid-row": `${this.y} / span ${this.height}`,
                }}>

            </div>
        )
    }
}