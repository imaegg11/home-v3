import { createSignal, onMount } from "solid-js";
import { CalDate } from "~/components/CalDate";
import { Search } from "~/components/Search";
import { Time } from "~/components/Time";
import { settings } from "~/settings/settings";

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "~/components/ui/dialog"

export default function Home() {
    onMount(() => {

        if (localStorage['should-load-settings'] == null) {
            localStorage['should-load-settings'] = false

            settings.load({
                "theme": {
                    "theme": "system"
                },
                "background": {
                    "bg": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fspaceman-astronaut-live-wallpaper-4k-v0-oiiuaraiv8va1.png%3Fwidth%3D1920%26format%3Dpng%26auto%3Dwebp%26s%3Dfec9b30b5e8556406425c4ca5db7070e2e75aaef&f=1&nofb=1&ipt=779b0940b3037b90877785569a31465c15f7f8261e99d4328dcd3b0aa87e3b63"
                },
                "css": {
                    "content": "#search-bar {\n    opacity: 0.75;\n}\n\n#widgets > div > div {\n  background: rgba(9, 9, 11, 0.9)\n}\n\nbody {\n    background-size: 150%;\n    background-position: 10% 30%;\n}\n\n@media (max-width: 900px) {\n    body {\n        background-size: 200%;\n    }\n}"
                },
                "search": {
                    "search_engine": "DuckDuckGo",
                    "search_templates": [
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
                        }
                    ]
                },
                "widgets": {
                    "widgets": [
                        {
                            "name": "System Info",
                            "settings": {
                                "id": "lcNhGbBQJw",
                                "height": 1,
                                "width": 2,
                                "url": "",
                                "x": 1,
                                "y": 1
                            }
                        },
                        {
                            "name": "System Info",
                            "settings": {
                                "id": "w78PeP9-pC",
                                "height": 2,
                                "width": 1,
                                "url": "",
                                "x": 1,
                                "y": 2
                            }
                        },
                        {
                            "name": "System Info",
                            "settings": {
                                "id": "7SrYmHz_T5",
                                "height": 1,
                                "width": 2,
                                "url": "",
                                "x": 2,
                                "y": 2
                            }
                        },
                        {
                            "name": "News",
                            "settings": {
                                "id": "d2cUbVugP_",
                                "height": 1,
                                "width": 2,
                                "url": "",
                                "x": 2,
                                "y": 3
                            }
                        },
                        {
                            "name": "News",
                            "settings": {
                                "id": "pETVhasHCT",
                                "height": 1,
                                "width": 3,
                                "url": "",
                                "x": 3,
                                "y": 1
                            }
                        },
                        {
                            "name": "News",
                            "settings": {
                                "id": "hfNfep3RYi",
                                "height": 2,
                                "width": 2,
                                "url": "",
                                "x": 5,
                                "y": 2
                            }
                        },
                        {
                            "name": "News",
                            "settings": {
                                "id": "ZfCWuqsu8x",
                                "height": 1,
                                "width": 1,
                                "url": "",
                                "x": 6,
                                "y": 1
                            }
                        },
                        {
                            "name": "Time Progress",
                            "settings": {
                                "id": "vaUSTgJjIO",
                                "height": 2,
                                "width": 1,
                                "animate": true,
                                "x": 4,
                                "y": 2
                            }
                        }
                    ]
                },
                "data": {},
                "about": {}
            })
        } else {
            settings.load()
        }

    })

    const [open, setOpen] = createSignal(localStorage['should-open-this-again'] != 'false');

    const close = () => {
        localStorage['should-open-this-again'] = false;

        setOpen(false)
    }

    return (
        <div class="grid place-items-center content-center h-screen w-screen space-y-8">
            <div class="select-none text-center w-3/5">
                <Time></Time>
                <CalDate></CalDate>
                <br></br>
                <Search SearchSetting={settings.get('search')}></Search>
            </div>
            <div id='widget-parent'>
                {settings.get('widgets').wrapped_render_widgets()}
            </div>
            <div>
                {settings.render()}
            </div>

            <Dialog open={open()} onOpenChange={setOpen}>
                <DialogContent class="" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }}
                    onCloseAutoFocus={() => { document.getElementById("search-bar")?.focus() }}
                >
                    <DialogHeader>
                        <p class='mb-0 text-2xl font-bold'>
                            READ ME PLEASE
                        </p>
                        <p>I swear it's quick</p>
                    </DialogHeader>

                    <p>
                        So, you might have seen this project before. I'm reshipping because unfortunately I did not market the features well enough and some (again entirely my fault) were not able to fully experience the site. The site you see right now is specifically designed for flavourtown and the one I use personally is hosted on another link. This one is pre-loaded with a settings.json to allow for the full experience of what it can be. All the data are dummy so you don't actually have to find a proper url link. Please take your time to look around. Do also check out the settings menu, either through `Ctrl + Period` or the settings menu in the bottom right. Thank you!
                    </p>
                    <p>P.S press anywhere outside to close this!</p>
                    <button onClick={close} type="button" class="cursor-pointer w-full rounded-lg border border-gs-80 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">Close and do not show this message again</button>

                </DialogContent>
            </Dialog>
        </div>
    );
}
