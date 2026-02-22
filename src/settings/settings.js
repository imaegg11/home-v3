import { SearchSetting } from "./all_settings/search_settings";
import { SettingTemplate } from "./all_settings/setting_template";
import { SettingManager } from "./settings_manager";

export const settings = new SettingManager();

settings.add(new SearchSetting("search", "Search"));

// settings.add(new SettingTemplate("test 1", "Appearance"));
// settings.add(new SettingTemplate("test 2", "Widgets"));
// settings.add(new SettingTemplate("test 3", "Customization"));
// settings.add(new SettingTemplate("test 4", "Data & Storage"));
// settings.add(new SettingTemplate("test 5", "About"));
