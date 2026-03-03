import { Progress } from "~/components/ui/progress"
import { WidgetTemplate } from "./widgets_template"
import { createSignal, onMount } from "solid-js"

export class ProgressWidget extends WidgetTemplate {
    constructor(x, y, w = 1, h = 1) {
        super("Progress", {
            x, y, w, h, 
            anime: true
        })
    }

    render() {

        const getYearProgress = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const end = new Date(now.getFullYear() + 1, 0, 1);

            const total = end - start;
            const elapsed = now - start;

            const progress = (elapsed / total) * 100;

            return progress.toFixed(2);
        }

        let currentYearProgress = getYearProgress()

        const [ progress, setProgress ] = createSignal((0.00).toFixed(2))
        let tick = 0

        const getCurve = (x) => {
            return 0.5 * Math.tanh(3.5 * (x - 0.8)) + 0.5;
        }

        const animateProgress = () => {
            if (tick >= 2) {
                setProgress(getYearProgress())
            }
            else {
                tick += 0.006
                setProgress((getCurve(tick) * currentYearProgress).toFixed(2))
                requestAnimationFrame(animateProgress)
            }
        }

        onMount(() => {
            if (this.settings.animate) {
                setTimeout(() => requestAnimationFrame(animateProgress), 100)
            } else {
                setProgress(currentYearProgress)
            }
        })

        return (
            <div
                class="bg-accent-50 rounded-md grid place-items-center"
                style={{
                    "grid-column": `${this.settings.x} / span ${this.settings.width}`,
                    "grid-row": `${this.settings.y} / span ${this.settings.height}`,
                }}>
                <div className="text text-center w-full px-4">
                    <p>The Year Is</p>
                    <p className="text-3xl font-semibold">{progress()}%</p>
                    <Progress value={progress()} class='mx-auto my-3 [&>div]:h-2.5 [&>div]:bg-transparent'></Progress>
                    <p>Done.</p>
                </div>
            </div>
        )
    }
}