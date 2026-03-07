import { ProgressCircle } from "~/components/ui/progress-circle"
import { WidgetTemplate } from "./widgets_template"
import { Progress } from "~/components/ui/progress"

import { createResource, onCleanup, onMount, Suspense } from "solid-js";
import { toast } from "solid-sonner";

export class SystemWidget extends WidgetTemplate {
    constructor(settings) {
        super("System Info", {
            url: "",
            ...settings,
        })
    }

    render_content() {

        const fetchResource = async () => {
            const res = await fetch(this.settings.url);
            if (!res.ok) {
                toast.error("System Info: Failed to fetch from url")
                throw new Error('Failed to fetch from url');
            }

            const text = await res.text();

            try {
                console.log(text)
                return JSON.parse(text);
            } catch (err) {
                toast.error("System Info: Invalid JSON response");
                throw new Error("Invalid JSON response");
            }

        }

        const [data, { refetch, mutate }] = createResource(fetchResource)

        // ?????????

        // let interval;

        // onMount(() => {
        //     interval = setInterval(() => {
        //         refetch()
        //     }, 3000);
        // })

        // onCleanup(() => clearInterval(interval))

        return (
            <Suspense fallback={<div class="bg-accent-80/10 animate-pulse"></div>}>
                <div
                    class="bg-accent-80 grid place-items-center">
                    <div className={`${this.settings.width >= 2 ? "grid" : ""} grid-cols-[45fr_55fr] [&>div]:p-2 place-items-center`}>
                        <div class=''>
                            <ProgressCircle value={data()?.data.battery.percent} size={"lg"}>
                                <span class="text-2xl font-bold text-accent-30">{data()?.data.battery.percent}%</span>
                            </ProgressCircle>
                        </div>
                        <div class='select-none space-y-1.5'>
                            <div class='space-y-1'>
                                <p class='text-xs text-accent-15'>CPU - {data()?.data.cpu.total_percent}% ({data()?.data.cpu.temperature.readings[0].current}°C)</p>
                                <Progress class='[&>div]:h-1.5' value={data()?.data.cpu.total_percent}></Progress>
                            </div>

                            <div class='space-y-1'>
                                <p class='text-xs text-accent-15'>RAM - {data()?.data.ram.percent}%</p>
                                <Progress class='[&>div]:h-1.5' value={data()?.data.ram.percent}></Progress>
                            </div>

                            <div class='space-y-1'>
                                <p class='text-xs text-accent-15'>STORAGE - {data()?.data.disk.total.percent}%</p>
                                <Progress class='[&>div]:h-1.5' value={data()?.data.disk.total.percent}></Progress>
                            </div>

                            <div>
                                <p class='text-xs text-accent-15'>UPTIME - {data()?.data.uptime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        )
    }
}