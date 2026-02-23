import { createEffect, createSignal } from "solid-js";
import { SettingTemplate } from "./setting_template";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "~/components/ui/select"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "~/components/ui/accordion"

export class SearchSetting extends SettingTemplate {

    constructor(name, heading) {
        super(name, heading)

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
    }

    get_search_engine() {
        return this.search_engines[this.search_engine];
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
                        <SelectTrigger aria-label="Search Engine" class="text-xs h-8 w-45">
                            <SelectValue >{(state) => state.selectedOption()}</SelectValue>
                        </SelectTrigger>
                        <SelectContent />
                    </Select>
                </div>
                <hr class='border-gs-90'></hr>
                <div>
                    <div>
                        <p class="text-sm">Search shortcuts</p>
                        <p class='text-xs text-gs-50'>Templates to help you search faster!</p>
                    </div>
                    <div class="flex justify-center">
                        <Accordion multiple={false} collapsible class="my-4 mx-2 w-full space-y-8">
                            <AccordionItem value="item-1" class="border border-gs-90 bg-bg rounded-xl">
                                <AccordionTrigger class='hover:no-underline cursor-pointer px-4'>
                                    <div class="ml-4 flex items-center w-full justify-between text-sm">
                                        <div class="text-left">
                                            <p class="text-sm">Shortcut - Wikipedia</p>
                                            <p class="text-xs text-gs-50">Template: wiki ${"{value}"}</p>
                                        </div>
                                        <button type="button" class="cursor-pointer rounded-lg border border-gs-80 bg-bg px-3 py-2 text-[0.65rem] uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">REMOVE</button>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div class='p-4 pt-0'>
                                        <hr class='border-gs-90 mb-4'></hr>
                                        <div class='space-y-2'>
                                            <div class="flex space-between gap-2">
                                                <div class="w-full">
                                                    <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>NAME</p>
                                                    <input type="text" autoComplete="off" placeholder="Name"
                                                        className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                                    ></input>
                                                </div>
                                                <div class='w-full'>
                                                    <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>COLOR</p>
                                                    <div class='flex items-center gap-2 h-10'>
                                                        <input type="text" autoComplete="off" placeholder="Color"
                                                            className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                                        ></input>
                                                        <div class='h-[90%] border border-border aspect-square bg-accent-50 rounded-md'></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class='w-full'>
                                                <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>TEMPLATE</p>
                                                <input type="text" autoComplete="off" placeholder="Template"
                                                    className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                                ></input>
                                            </div>

                                            <div class='w-full'>
                                                <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>LINK</p>
                                                <input type="text" autoComplete="off" placeholder="Link"
                                                    className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </div>
        )
    }

}