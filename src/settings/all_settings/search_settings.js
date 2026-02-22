import { SettingTemplate } from "./setting_template";

export class SearchSetting {

    constructor(name, heading) {
        this.name = name; 
        this.heading = heading;

        this.search_engines = {
            "DuckDuckGo": "https://duckduckgo.com/?t=ffab&q="
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
        return (
            <div>
                
            </div>
        )    
    }

}