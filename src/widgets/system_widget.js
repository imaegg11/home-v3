import WidgetTemplate from "./widgets_template"

import { createResource, onCleanup, Suspense } from "solid-js";

export default class SystemWidget extends WidgetTemplate {
    static name = "System Info";

    constructor(settings) {
        super({
            url: "",
            ...settings,
        })
    }

    render_content() {

        // We probably need to do this a better way but honestly I can't be bothered right now
        const fetchResource = async () => {
            let res;

            try {
                res = await fetch(this.settings.url);
            } catch (e) {
                throw new Error('System Info: Failed to fetch from url');
            }

            if (this.settings.url == "" || !res.ok) {
                throw new Error('System Info: Failed to fetch from url');
            }

            const text = await res.text();

            try {
                return JSON.parse(text);
            } catch (err) {
                throw new Error("System Info: Invalid JSON response");
            }

        }

        const [data, { refetch }] = createResource(fetchResource)

        const timer = setInterval(() => {
            refetch();
        }, 5000);

        onCleanup(() => clearInterval(timer));

        const battery = {
            "full": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-full-icon lucide-battery-full"><path d="M10 10v4" /><path d="M14 10v4" /><path d="M22 14v-4" /><path d="M6 10v4" /><rect x="2" y="6" width="16" height="12" rx="2" /></svg>,
            "medium": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fab387" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-medium-icon lucide-battery-medium"><path d="M10 14v-4" /><path d="M22 14v-4" /><path d="M6 14v-4" /><rect x="2" y="6" width="16" height="12" rx="2" /></svg>,
            "low": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f9e2af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-low-icon lucide-battery-low"><path d="M22 14v-4" /><path d="M6 14v-4" /><rect x="2" y="6" width="16" height="12" rx="2" /></svg>,
            "charging": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-charging-icon lucide-battery-charging"><path d="m11 7-3 5h4l-3 5" /><path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" /><path d="M22 14v-4" /><path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" /></svg>
        }

        const color = {
            "full": "#a6e3a1",
            "charging": "#a6e3a1",
            "medium": "#fab387",
            "low": "#f9e2af"
        }

        const getSection = (percent, charging = false) => {
            if (charging) return "charging";
            if (percent >= 70) return "full";
            if (percent >= 30) return "medium";
            return "low";
        }

        function truncate3(n) {
            const [whole, decimal = ''] = String(n).split('.');
            const digits = (whole + decimal).slice(0, 3);

            if (whole.length >= 3) return Number(digits);

            const result = `${digits.slice(0, whole.length)}.${digits.slice(whole.length)}`;
            return Number(result);
        }

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse"></div>}>
                <div class="bg-accent-80 py-2 px-4 overflow-hidden grid place-items-center">
                    <div class='w-full'>
                        <div class='text-xs flex justify-between items-center w-full'>
                            <p class='tracking-wide'>SYSTEM</p>
                            <p class='flex gap-1 items-center'
                                style={{
                                    'color': color[getSection(data.latest?.data.battery.percent, data.latest?.data.battery.charging)]
                                }}
                            >{data.latest?.data.battery.percent}% {battery[getSection(data.latest?.data.battery.percent, data.latest?.data.battery.charging)]}</p>
                        </div>
                        <div class='grid grid-cols-2 grid-rows-2 gap-x-2 mt-1.5'>
                            <div class='border-t border-text p-1'>
                                <p class='text-[10px] tracking-wide text-gs-50'>CPU</p>
                                <p class='font-[20px]'
                                    style={{
                                        "line-height": "normal"
                                    }}
                                >{truncate3(data.latest?.data.cpu.total_percent)}<span class='text-[12px]'>%</span></p>
                            </div>

                            <div class='border-t border-text p-1'>
                                <p class='text-[10px] tracking-wide text-gs-50'>TEMP</p>
                                <p class='font-[20px]'
                                    style={{
                                        "line-height": "normal"
                                    }}
                                >{truncate3(data.latest?.data.cpu.temperature)}<span class='text-[12px]'>°C</span></p>
                            </div>

                            <div class='border-t border-text p-1'>
                                <p class='text-[10px] tracking-wide text-gs-50'>RAM</p>
                                <p class='font-[20px]'
                                    style={{
                                        "line-height": "normal"
                                    }}
                                >{truncate3(data.latest?.data.ram)}<span class='text-[12px]'>%</span></p>
                            </div>

                            <div class='border-t border-text p-1'>
                                <p class='text-[10px] tracking-wide text-gs-50'>DISK</p>
                                <p class='font-[20px]'
                                    style={{
                                        "line-height": "normal"
                                    }}
                                >{truncate3(data.latest?.data.disk)}<span class='text-[12px]'>%</span></p>
                            </div>
                        </div>

                        <p class='text-[10px] text-gs-50 w-full text-right'>UP <span class='text-text'>{data.latest?.data.uptime}</span></p>
                    </div>
                </div>
            </Suspense>
        )
    }
}