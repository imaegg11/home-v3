import { WidgetTemplate } from "./widgets_template"
import { createResource, Suspense, Show } from "solid-js";
import { toast } from "solid-sonner";

export class WeatherWidget extends WidgetTemplate {
    constructor(settings) {
        super("Weather", {
            url: "",
            link: "",
            showHourly: true,
            ...settings,
        })

        this.details = {
            showHourly: {
                text: "Show Hourly Forecast",
                description: "Display hourly weather forecast"
            }
        }
    }

    render_content() {
        // Simple SVG weather icons
        const WeatherIcon = (props) => {
            const icons = {
                sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
                cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
                rain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>,
                snow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="m5 9 7 7 7-7"/><path d="m5 15 7-7 7 7"/></svg>,
                fog: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h16"/><path d="M4 18h12"/><path d="M4 10h14"/></svg>,
                partlyCloudy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>,
            };
            return <div class={props.class}>{icons[props.type] || icons.cloud}</div>;
        };

        const getWeatherIcon = (code) => {
            if (code === 1000) return "sun"; // Sunny/Clear
            if ([1003, 1006].includes(code)) return "partlyCloudy"; // Partly cloudy/Cloudy
            if ([1009, 1030, 1135, 1147].includes(code)) return "cloud"; // Overcast/Mist/Fog
            if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276].includes(code)) return "rain"; // Rain variations
            if ([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282].includes(code)) return "snow"; // Snow/sleet variations
            return "cloud";
        };

        const fetchResource = async () => {
            const res = await fetch(this.settings.url);
            if (this.settings.url == "" || !res.ok) {
                toast.error("Weather: Failed to fetch from url")
                throw new Error('Failed to fetch from url');
            }

            const text = await res.text();

            try {
                return JSON.parse(text);
            } catch (err) {
                toast.error("Weather: Invalid JSON response");
                throw new Error("Invalid JSON response");
            }
        }

        const [data, { refetch }] = createResource(fetchResource)

        // Get next 6 hours of forecast
        const getHourlyForecast = () => {
            if (!data()) return [];
            const currentHour = new Date().getHours();
            const hourly = data()?.forecast?.forecastday[0]?.hour || [];
            
            // Find current hour and get next 6 hours
            const currentIndex = hourly.findIndex(h => {
                const hourTime = new Date(h.time_epoch * 1000).getHours();
                return hourTime >= currentHour;
            });
            
            if (currentIndex === -1) return hourly.slice(0, 6);
            return hourly.slice(currentIndex, currentIndex + 6);
        }

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse rounded-md"></div>}>
                <div class="bg-accent-80 rounded-md h-full flex flex-col overflow-hidden">
                    {/* Current Weather */}
                    <a 
                        href={this.settings.link || "#"}
                        class="flex-1 flex flex-col items-center justify-center px-4 pt-5 pb-4 min-h-0 cursor-pointer hover:bg-accent-80/80 transition-colors"
                    >
                        <div class="text-center">
                            <p class="text-sm text-accent-20 mb-1">{data()?.location?.name}</p>
                            <div class="flex items-center justify-center gap-3 mb-1">
                                <WeatherIcon type={getWeatherIcon(data()?.current?.condition?.code)} class="w-12 h-12 text-accent-20" />
                                <p class="text-5xl font-bold">{Math.round(data()?.current?.temp_c)}°</p>
                            </div>
                            <p class="text-sm text-accent-30 mb-1">{data()?.current?.condition?.text}</p>
                            
                            {/* Additional Details */}
                            <div class="space-y-0.5 text-xs text-accent-20">
                                <p>
                                    Feels <span class="font-medium">{Math.round(data()?.current?.feelslike_c)}°C</span>
                                    <span class="mx-1.5 text-accent-30">•</span>
                                    Humidity <span class="font-medium">{data()?.current?.humidity}%</span>
                                </p>
                                <p>
                                    Wind <span class="font-medium">{Math.round(data()?.current?.wind_kph)} km/h</span>
                                    <span class="mx-1.5 text-accent-30">•</span>
                                    UV <span class="font-medium">{Math.round(data()?.current?.uv || 0)}</span>
                                </p>
                            </div>
                        </div>
                    </a>

                    {/* Hourly Forecast */}
                    <Show when={this.settings.showHourly}>
                        <div class="border-t border-gs-80 px-2 pt-2 pb-3">
                            <div class="flex gap-3 overflow-x-auto pb-5">
                                <For each={getHourlyForecast()}>
                                    {(hour) => {
                                        const time = new Date(hour.time_epoch * 1000);
                                        const hourStr = time.getHours().toString().padStart(2, '0') + ':00';
                                        
                                        return (
                                            <div class="flex flex-col items-center min-w-16 text-center">
                                                <p class="text-[10px] text-accent-30 mb-1">{hourStr}</p>
                                                <WeatherIcon type={getWeatherIcon(hour.condition.code)} class="w-7 h-7 text-accent-30 mb-1" />
                                                <p class="text-sm font-medium">{Math.round(hour.temp_c)}°</p>
                                                <p class="text-[10px] text-accent-30 mb-1">feels {Math.round(hour.feelslike_c)}°</p>
                                                <Show when={hour.chance_of_rain > 0}>
                                                    <p class="text-[9px] text-accent-20">{hour.chance_of_rain}%</p>
                                                </Show>
                                            </div>
                                        )
                                    }}
                                </For>
                            </div>
                        </div>
                    </Show>
                </div>
            </Suspense>
        )
    }
}
