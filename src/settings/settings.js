import { SearchSetting } from "./all_settings/search_settings";
import { SettingManager } from "./settings_manager";

export const settings = new SettingManager();

settings.add(new SearchSetting("search", "Search"));