import { WidgetTemplate } from "./widgets_template"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "~/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { createResource, Suspense } from "solid-js";
import { toast } from "solid-sonner";

export class NewsWidget extends WidgetTemplate {
    constructor(settings) {
        super("News", {
            url: "",
            ...settings,
        })
    }

    render_content() {

        const validate = (article) => {
            if (article["source"] == null && article["author"] == null) return false
            else if (article["title"] == null) return false
            else if (article["urlToImage"] == null) return false
            else return true
        }

        const shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }

        const fetchResource = async () => {
            const res = await fetch(this.settings.url);
            if (this.settings.url == "" || !res.ok) {
                toast.error("System Info: Failed to fetch from url")
                throw new Error('Failed to fetch from url');
            }

            const text = await res.text();

            try {
                const json = JSON.parse(text);

                return shuffle(json["data"]["articles"].filter(e => validate(e)));
            } catch (err) {
                toast.error("System Info: Invalid JSON response");
                throw new Error("Invalid JSON response");
            }

        }

        const [data, { refetch, mutate }] = createResource(fetchResource)

        return (
            <Suspense fallback={<div class="bg-accent-80/30 animate-pulse"></div>}>

                <Carousel class="w-full h-full [&>div]:h-full"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnMouseEnter: true
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}>
                    <CarouselContent class="h-full">
                        <For each={data()}>
                            {(e, index) => {
                                let source = []
                                if (e.source != null) source.push(e.source)
                                if (e.author != null) source.push(e.author.split(",")[0])
                  
                                const clamp = {
                                    1: "line-clamp-2",
                                    2: "line-clamp-3",
                                    3: "line-clamp-4",
                                }

                                return (
                                    <CarouselItem key={e.title} class="h-full">
                                        <div class="h-full bg-cover bg-no-repeat bg-center mx-auto bg-transparent rounded-sm cursor-pointer" style={{ "background-image": `url(${e.urlToImage})` }}>
                                            <a href={e.url}>
                                                <div class="bg-linear-to-b from-transparent to-(--color-bg) h-full rounded-sm">
                                                    <div class="h-full relative">
                                                        <div class="absolute bottom-2 px-4">
                                                            <p class={`text-xs ${clamp[this.settings.height]}`}>{e.title.split(" - ")[0]}</p>
                                                            <p class="text-[10px] muted mt-1 line-clamp-1">{source.join(" • ")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </CarouselItem>
                                )
                            }}
                        </For>
                    </CarouselContent>
                    <CarouselPrevious class="cursor-pointer ml-14 top-[45%] bg-transparent border-none" />
                    <CarouselNext class="cursor-pointer mr-14 top-[45%] bg-transparent border-none" />
                </Carousel>
            </Suspense>
        )
    }
}