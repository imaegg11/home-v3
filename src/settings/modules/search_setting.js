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
import { createStore, unwrap } from "solid-js/store";

const CustomAccordion = ({ index, item, setItem, del }) => {

    const update = () => {
        let e = document.getElementById(`${index()}`)
        let inputs = e.querySelectorAll("input")

        for (const input of inputs) {
            setItem("search_templates", index(), input.placeholder.toLowerCase(), input.value)
        }
    }

    return (
        <AccordionItem value={index() + ""} id={index() + ""} class="border border-gs-90 bg-bg rounded-xl">
            <AccordionTrigger class='hover:no-underline cursor-pointer px-4'>
                <div class="ml-4 flex items-center w-full justify-between text-sm">
                    <div class="text-left">
                        <p class="text-sm">Shortcut - {item.name}</p>
                        <p class="text-xs text-gs-50">Template: {item.template}</p>
                    </div>
                    <button onClick={(e) => {del(); e.stopPropagation()}} type="button" class="cursor-pointer rounded-lg border border-gs-80 bg-bg px-3 py-2 text-[0.65rem] uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">REMOVE</button>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div class='p-4 pt-0'>
                    <hr class='border-gs-90 mb-4'></hr>
                    <div class='space-y-2'>
                        <div class="flex space-between gap-2">
                            <div class="w-full">
                                <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>NAME</p>
                                <input type="text" autoComplete="off" placeholder="Name" value={item.name} onInput={update}
                                    className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                ></input>
                            </div>
                            <div class='w-full'>
                                <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>COLOR</p>
                                <div class='flex items-center gap-2 h-10'>
                                    <input type="text" autoComplete="off" placeholder="Color" value={item.color} onInput={update}
                                        className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                                    ></input>
                                    <div class='h-[90%] border border-border aspect-square rounded-md' style={{ "background": item.color }}></div>
                                </div>
                            </div>
                        </div>

                        <div class='w-full'>
                            <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>TEMPLATE</p>
                            <input type="text" autoComplete="off" placeholder="Template" value={item.template} onInput={update}
                                className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                            ></input>
                        </div>

                        <div class='w-full'>
                            <p class='text-[0.65rem] text-gs-50 tracking-widest mb-2'>LINK</p>
                            <input type="text" autoComplete="off" placeholder="Link" value={item.link} onInput={update}
                                className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-90 select-none rounded-md px-4 focus-within:outline-none "
                            ></input>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

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
        const [settings, setSettings] = createStore({
            search_engine: this.search_engine,
            search_templates: this.search_templates
        })

        for (let setting_saved of Object.keys(this.to_be_saved)) {
            setSettings(setting_saved, this.to_be_saved[setting_saved])
        }

        const wrappedSetSettings = (...args) => {
            setSettings(...args);

            this.to_be_saved = {
                ...this.to_be_saved,
                ...unwrap(settings)
            }
        }

        return (
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm">Search Engine</p>
                        <p class='text-xs text-gs-50'>Default search engine to use.</p>
                    </div>
                    <Select
                        value={settings.search_engine}
                        onChange={(value) => wrappedSetSettings("search_engine", value)}
                        options={Object.keys(this.search_engines)}
                        placeholder="Select a search engine..."
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
                        <Accordion multiple={false} collapsible class="my-4 mx-2 w-full space-y-4">
                            <For each={settings.search_templates}>
                                {(item, index) => <CustomAccordion index={index} item={item} setItem={wrappedSetSettings} del={() => wrappedSetSettings("search_templates", items => items.filter((_, i) => i !== index()))}></CustomAccordion>}
                            </For>
                            <Show when={settings.search_templates.length == 0}>
                                <p class="w-full text-center mt-6 mb-3 text-sm text-gs-50">No search shortcuts found! Try adding one?</p>
                            </Show>
                        </Accordion>
                    </div>
                    <button
                        onClick={() => wrappedSetSettings("search_templates", items => items.concat([{
                            "name": "Template Name",
                            "template": "template",
                            "link": "",
                            "useEncodeURIComponent": true,
                            "color": "#005ec2"
                        }]))}                    
                        type="button" class="mx-2 cursor-pointer mt-3 w-full rounded-lg border border-dashed border-gs-80 bg-bg px-3 py-2 text-xs uppercase tracking-wider text-gs-30 hover:border-gs-60 hover:text-gs-15 transition-colors">+ Add Shortcut</button>

                </div>
            </div>
        )
    }
}