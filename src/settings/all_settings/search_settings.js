import { createEffect, createSignal } from "solid-js";
import { SettingTemplate } from "./setting_template";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select"

export class SearchSetting {

    constructor(name, heading) {
        this.name = name;
        this.heading = heading;

        this.search_engines = {
            "DuckDuckGo": "https://duckduckgo.com/?t=ffab&q=",
            "Google": "https://www.google.com/search?q=",
            "Bing": "https://www.bing.com/search?q=",
            "Brave": "https://search.brave.com/search?q=",
            "Ecosia": "https://www.ecosia.org/search?method=index&q="
        }

        this.search_templates = [
            {
                "name": "Wikipedia",
                "template": "wiki ${value}",
                "link": "https://en.wikipedia.org/wiki/${value}",
                "useEncodeURIComponent": true,
                "color": "#fca54e"
            },
            {
                "name": "Github",
                "template": "gh",
                "link": "https://github.com",
                "useEncodeURIComponent": true,
                "color": "#fc4e4e"
            },
        ]
        this.search_engine = "DuckDuckGo"

        this.to_be_saved = {}
    }

    get_search_engine() {
        console.log(this.search_engine)
        
        return this.search_engines[this.search_engine];
    }

    save() {
        for (let key of Object.keys(this.to_be_saved)) {
            this[key] = this.to_be_saved[key]
        }

        this.to_be_saved = {}
    }

    render() {
        const [searchEngine, setSearchEngine] = createSignal(this.search_engine)

        createEffect(() => {
            this.to_be_saved = {
                ...this.to_be_saved,
                search_engine: searchEngine()
            }
        })

        return (
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm">Search Engine</p>
                        <p class='text-xs text-gs-50'>Default search engine to use.</p>
                    </div>
                    <Select
                        value={searchEngine()}
                        onChange={setSearchEngine}
                        options={Object.keys(this.search_engines)}
                        placeholder="Select a fruit…"
                        itemComponent={(props) => <SelectItem class="text-xs" item={props.item}>{props.item.rawValue}</SelectItem>}
                        disallowEmptySelection={true}
                    >
                        <SelectTrigger aria-label="Fruit" class="text-xs h-8 w-[180px]">
                            <SelectValue >{(state) => state.selectedOption()}</SelectValue>
                        </SelectTrigger>
                        <SelectContent />
                    </Select>
                </div>
                <hr class='border-gs-90'></hr>
                <div>
                    <p class="text-sm">Search shortcuts</p>
                    <p class='text-xs text-gs-50'>Templates to help you search faster!</p>
                </div>
            </div>
        )
    }

}