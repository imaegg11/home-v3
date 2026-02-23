import { onMount } from "solid-js";
import { CalDate } from "~/components/CalDate";
import { Search } from "~/components/Search";
import { Time } from "~/components/Time";
import { settings } from "~/settings/settings";

export default function Home() {
    onMount(() => settings.load())

    return (
        <div class="grid place-items-center content-center h-screen w-screen">
            <div class="select-none text-center w-3/5">
                <Time></Time>
                <CalDate></CalDate>
                <br></br>
                <Search SearchSetting={settings.get('search')}></Search>
            </div>
            <div>
                {settings.render()}
            </div>
        </div>
    );
}
