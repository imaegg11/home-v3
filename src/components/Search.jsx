import { onMount } from "solid-js"
import { setRootVar } from "~/utils/root";


export function Search({ SearchSetting }) {

    onMount(() => {
        const search = document.getElementById("search-bar");

        search.addEventListener("keyup", (e) => custom_search(e, SearchSetting))
    })

    return (
        <input id="search-bar" type="text" autoComplete="off" autoFocus placeholder="Search"
            className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-85 select-none rounded-3xl px-6 transition focus-within:outline-none focus-within:shadow-[0_1px_6px_0_var(--shadow-color)] hover:shadow-[0_1px_6px_0_var(--shadow-color)]"
        ></input>
    )
}

function custom_search(event, SearchSetting) {
    let search_engine = SearchSetting.get_search_engine();
    let search_templates = SearchSetting.search_templates;

    let s = event.target.value; 

    let link = null;

    for (let template of search_templates) {
        let prefix_end = template.template.indexOf("${value}");
        let prefix = template.template.substring(0, prefix_end != -1 ? prefix_end : s.length)
        
        if (template.template == s) {
            link = template.link;

            setRootVar("shadow-color", template.color);
            break;
        } else if (s != "" && prefix_end != -1 && s.startsWith(prefix)) {
            let value = s.substring(prefix_end);

            if (template.useEncodeURIComponent) {
                link = template.link.replace("${value}", encodeURIComponent(value));
            } else {
                link = template.link.replace("${value}", value);
            }

            setRootVar("shadow-color", template.color);
            break;
        }
    }

    if (link == null) {
        link = `${search_engine}${encodeURIComponent(s)}`;
        setRootVar("shadow-color", "var(--color-n-50)");
    }

    if (event.keyCode == 13) {
        if (event.ctrlKey) {
            window.open(link);
        } else {
            window.location.href = link;
        }

        event.target.value = "";
        setRootVar("shadow-color", "var(--color-n-50)");
    }
}