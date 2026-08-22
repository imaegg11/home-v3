import { onMount } from "solid-js";
import { setRootVar } from "~/utils/root";


export function Search({ SearchSetting }) {
    let blockEnterUntil = 0;

    onMount(() => {
        const search = document.getElementById("search-bar");

        if (search) {
            // Prevent browsers from restoring stale value and immediately submitting it.
            search.value = "";
        }

        setRootVar("shadow-color", "var(--color-n-50)");
        blockEnterUntil = performance.now() + 450;
    })

    const updateSearchColor = (event) => {
        const value = event.currentTarget.value;
        const { color } = resolveSearch(value, SearchSetting);

        setRootVar("shadow-color", color);
    }

    const submitSearch = (event) => {
        if (event.key !== "Enter") return;
        if (performance.now() < blockEnterUntil) return;

        const value = event.currentTarget.value;
        const { link } = resolveSearch(value, SearchSetting);

        if (event.ctrlKey || event.metaKey) {
            window.open(link);
        } else {
            window.location.href = link;
        }

        event.currentTarget.value = "";
        setRootVar("shadow-color", "var(--color-n-50)");
    }

    return (
        <input id="search-bar" type="text" autoComplete="off" autoFocus placeholder="Search"
            className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-85 select-none rounded-3xl px-6 transition focus-within:outline-none focus-within:shadow-[0_1px_6px_0_var(--shadow-color)] hover:shadow-[0_1px_6px_0_var(--shadow-color)]"
            onInput={updateSearchColor}
            onKeyDown={submitSearch}
            onFocus={() => {
                blockEnterUntil = Math.max(blockEnterUntil, performance.now() + 120);
            }}
        ></input>
    )
}

function resolveSearch(value, SearchSetting) {
    let search_engine = SearchSetting.get_search_engine();
    let search_templates = SearchSetting.settings.search_templates;

    let s = value;

    let link = null;
    let color = "var(--color-n-50)";

    for (let template of search_templates) {
        let prefix_end = template.template.indexOf("${value}");
        let prefix = template.template.substring(0, prefix_end != -1 ? prefix_end : s.length)
        
        if (template.template == s) {
            link = template.link;

            color = template.color;
            break;
        } else if (s != "" && prefix_end != -1 && s.startsWith(prefix)) {
            let value = s.substring(prefix_end);

            if (template.useEncodeURIComponent) {
                link = template.link.replace("${value}", encodeURIComponent(value));
            } else {
                link = template.link.replace("${value}", value);
            }

            color = template.color;
            break;
        }
    }

    if (link == null) {
        link = `${search_engine}${encodeURIComponent(s)}`;
        color = "var(--color-n-50)";
    }

    return { link, color };
}