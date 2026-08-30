import WidgetTemplate from "./widgets_template"
import { createResource, For, Suspense, Show } from "solid-js";
import { toast } from "solid-sonner";
import { truncate3 } from "../utils/truncate3";

export default class WeatherWidget extends WidgetTemplate {
    static name = "Weather";

    constructor(settings) {
        super({
            url: "",
            link: "",
            ...settings,
        })
    }

    render_content() {
        const WeatherIcon = (props) => {
            const icons = {
                sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
                moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
                cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
                rain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21" /><line x1="8" y1="13" x2="8" y2="21" /><line x1="12" y1="15" x2="12" y2="23" /><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" /></svg>,
                snow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M8 15h.01" /><path d="M8 19h.01" /><path d="M12 17h.01" /><path d="M12 21h.01" /><path d="M16 15h.01" /><path d="M16 19h.01" /></svg>,
                fog: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h16" /><path d="M4 18h12" /><path d="M4 10h14" /></svg>,
                partlyCloudy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" /></svg>,
                partlyCloudyNight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.188 8.5A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197" /><path d="M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z" /></svg>,
                storm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" /><path d="m13 12-3 5h4l-3 5" /></svg>,
                drizzle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M8 19v1" /><path d="M8 14v1" /><path d="M12 21v1" /><path d="M12 16v1" /><path d="M16 19v1" /><path d="M16 14v1" /></svg>,
                overcast: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" /><path d="M7 8a4 4 0 0 1 7.6-1.8" /></svg>,
                freezingRain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" /><line x1="8" y1="14" x2="6" y2="20" /><line x1="12" y1="15" x2="10" y2="21" /><line x1="16" y1="14" x2="14" y2="20" /></svg>,
                icePellets: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" /><circle cx="8" cy="17" r="1.6" fill="currentColor" stroke="none" /><circle cx="13" cy="20" r="1.6" fill="currentColor" stroke="none" /><circle cx="17" cy="16" r="1.6" fill="currentColor" stroke="none" /></svg>
            };
            return <div class={props.class}>{icons[props.type] || icons.cloud}</div>;
        };

        const parseAstroTime = (value) => {
            if (!value) return null;
            const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
            if (!match) return null;

            let hours = Number(match[1]);
            const minutes = Number(match[2]);
            const meridiem = match[3].toUpperCase();

            if (meridiem === "PM" && hours !== 12) hours += 12;
            if (meridiem === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        const isNightTime = (epoch) => {
            if (!epoch) return false;

            const target = new Date(epoch * 1000);
            const currentMinutes = target.getHours() * 60 + target.getMinutes();
            const forecastDay = data()?.forecast?.forecastday?.find(day => {
                const dayDate = new Date(day.date_epoch * 1000);
                return dayDate.toDateString() === target.toDateString();
            }) || data()?.forecast?.forecastday?.[0];

            const sunrise = parseAstroTime(forecastDay?.astro?.sunrise);
            const sunset = parseAstroTime(forecastDay?.astro?.sunset);

            if (sunrise === null || sunset === null) {
                return currentMinutes >= 18 * 60 || currentMinutes < 6 * 60;
            }

            return currentMinutes < sunrise || currentMinutes >= sunset;
        };

        const getWeatherIcon = (code, isNight = false) => {
            // Clear
            if (code === 1000) return isNight ? "moon" : "sun";

            // Cloud states
            if (code === 1003) return isNight ? "partlyCloudyNight" : "partlyCloudy";
            if (code === 1006 || code == 1009) return "cloud";

            // Fog / haze / mist / dust / smoke family
            if ([
                1012, 1015, 1018, 1021, 1024, 1027,
                1030, 1033, 1036, 1039, 1042, 1045, 1048,
                1135, 1147
            ].includes(code)) return "fog";

            // Thunderstorms
            if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "storm";

            // Drizzle
            if ([1063, 1072, 1150, 1153, 1168, 1171].includes(code)) return "drizzle";

            // Freezing rain + sleet (mixed/icy precipitation)
            if ([1198, 1201, 1069, 1204, 1207, 1249, 1252].includes(code)) return "freezingRain";

            // Rain / rain showers
            if ([
                1180, 1183, 1186, 1189, 1192, 1195,
                1240, 1243, 1246
            ].includes(code)) return "rain";

            // Snow / snow showers / blowing snow
            if ([
                1066, 1114, 1117,
                1210, 1213, 1216, 1219, 1222, 1225,
                1255, 1258
            ].includes(code)) return "snow";

            // Ice pellets
            if ([1237, 1261, 1264].includes(code)) return "icePellets";

            return "cloud";
        };

        const fetchResource = async () => {
            const res = await fetch(this.settings.url);
            if (this.settings.url == "" || !res.ok) {
                throw new Error('Failed to fetch from url');
            }

            const text = await res.text();

            try {
                return JSON.parse(text);
            } catch (err) {
                throw new Error("Invalid JSON response");
            }
        }

        const [data] = createResource(fetchResource)

        const getHourlyForecast = () => {
            if (!data()) return [];

            const now = Date.now();
            const hourly = data()?.forecast?.forecastday?.map(day => day?.hour).flat() || [];
            const upcoming = hourly.filter(hour => new Date(hour.time_epoch * 1000).getTime() >= now).slice(0, 8);

            if (upcoming.length) return upcoming;
            return hourly.slice(0, 8);
        }

        const formatWind = () => {
            const windKph = data()?.current?.wind_kph;

            if (windKph === undefined || windKph === null) return "--";
            return truncate3(windKph);
        }

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse rounded-md"></div>}>
                <div class='bg-accent-80 rounded-md h-full p-4 flex-col flex'>
                    <a href={this.settings.link || "#"}
                        class='[&:hover>span:nth-child(2)]:pl-2 text-[10px] text-gs-30 flex items-center'>
                        <p class='uppercase mr-2 line-normal'>{data()?.location?.name || "Weather"}</p>
                        <span class='transition-all'>→</span>
                    </a>
                    <div class='text-gs-10 flex items-end gap-2 mt-2'>
                        <WeatherIcon
                            class="w-6 h-6"
                            type={getWeatherIcon(data()?.current?.condition?.code, isNightTime(data()?.location?.localtime_epoch || data()?.current?.last_updated_epoch))}
                        ></WeatherIcon>
                        <p class='text-xs'>{data()?.current?.condition?.text || "Loading weather"}</p>
                    </div>

                    <div class="flex items-start mt-2 mx-6">
                        <p class='text-7xl'>{Math.round(data()?.current?.temp_c ?? 0)}</p>
                        <p class='text-2xl'>°C</p>
                    </div>

                    <div class='mt-2 flex *:px-2 divide-x divide-gs-50'>
                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Feels Like</p>
                            <p class='bold text-xs'>{Math.round(data()?.current?.feelslike_c ?? 0)}°C</p>
                        </div>

                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Humidity</p>
                            <p class='bold text-xs'>{data()?.current?.humidity ?? 0}%</p>
                        </div>

                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Wind</p>
                            <p class='bold text-xs'>{data()?.current?.wind_dir || "--"} {formatWind()} km/h</p>
                        </div>
                    </div>

                    <div class='mt-2 flex-1 flex gap-2 scroll-overlay select-none *:shrink-0'>
                        <For each={getHourlyForecast()}>
                            {(hour) => {
                                const time = new Date(hour.time_epoch * 1000);
                                const hourLabel = time.toLocaleString("en-US", {
                                    hour: "numeric",
                                    hour12: true,
                                }).toLowerCase();

                                return (
                                    <div class='border border-gs-50 rounded-sm w-24 h-full p-2 pt-1 flex flex-col'>
                                        <div class='flex justify-between mt-1'>
                                            <p class='uppercase text-gs-30 text-[10px]'>{hourLabel}</p>
                                            <WeatherIcon
                                                class='w-5 h-5 mt-1'
                                                type={getWeatherIcon(hour.condition.code, isNightTime(hour.time_epoch))}
                                            ></WeatherIcon>
                                        </div>
                                        <div class='mt-auto'>
                                            <p class='text-sm'>{Math.round(hour.temp_c)}°C</p>
                                            <p class='text-gs-30 text-[8px]'>Feels Like {Math.round(hour.feelslike_c)}°C</p>
                                        </div>
                                    </div>
                                )
                            }}
                        </For>
                    </div>
                </div>
            </Suspense>
        )
    }
}
