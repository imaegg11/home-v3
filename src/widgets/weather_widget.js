import WidgetTemplate from "./widgets_template"
import { createResource, For, Suspense } from "solid-js";
import WeatherApi from "../utils/weather/weatherapi";

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
        const fetchResource = async () => {
            const api = new WeatherApi(this.settings.url);
            return api.fetchWeather();
        }

        const [data] = createResource(fetchResource)
        const summary = () => WeatherApi.getWeatherSummary(data());

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse rounded-md"></div>}>
                <div class='bg-accent-80 rounded-md h-full p-4 flex-col flex'>
                    <a href={this.settings.link || "#"}
                        class='[&:hover>span:nth-child(2)]:pl-2 text-[10px] text-gs-30 flex items-center'>
                        <p class='uppercase mr-2 line-normal'>{summary().locationName}</p>
                        <span class='transition-all'>→</span>
                    </a>

                    <div class='text-gs-10 flex items-end gap-2 mt-2'>
                        <WeatherApi.WeatherIcon
                            class="w-6 h-6"
                            type={summary().iconType}
                        ></WeatherApi.WeatherIcon>
                        <p class='text-xs'>{summary().conditionText}</p>
                    </div>

                    <div class="flex items-start mt-2 mx-6">
                        <p class='text-7xl'>{summary().tempC}</p>
                        <p class='text-2xl'>°C</p>
                    </div>

                    <div class='mt-2 flex *:px-2 divide-x divide-gs-50'>
                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Feels Like</p>
                            <p class='bold text-xs'>{summary().feelsLikeC}°C</p>
                        </div>

                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Humidity</p>
                            <p class='bold text-xs'>{summary().humidity}%</p>
                        </div>

                        <div class='text-[10px]'>
                            <p class='text-gs-30 uppercase'>Wind</p>
                            <p class='bold text-xs'>{summary().windDirection} {WeatherApi.formatWind(summary().windKph)} km/h</p>
                        </div>
                    </div>

                    <div class='mt-2 flex-1 flex gap-2 scroll-overlay select-none *:shrink-0'>
                        <For each={summary().hourly}>
                            {(hour) => (
                                <div class='border border-gs-50 rounded-sm w-24 h-full p-2 pt-1 flex flex-col'>
                                    <div class='flex justify-between mt-1'>
                                        <p class='uppercase text-gs-30 text-[10px]'>{hour.hourLabel}</p>
                                        <WeatherApi.WeatherIcon
                                            class='w-5 h-5 mt-1'
                                            type={hour.iconType}
                                        ></WeatherApi.WeatherIcon>
                                    </div>
                                    <div class='mt-auto'>
                                        <p class='text-sm'>{hour.tempC}°C</p>
                                        <p class='text-gs-30 text-[8px]'>Feels Like {hour.feelsLikeC}°C</p>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Suspense>
        )
    }
}
