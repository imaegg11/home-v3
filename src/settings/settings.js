import { BackgroundSetting } from "./modules/background_setting";
import { SearchSetting } from "./modules/search_setting";
import { ThemeSetting } from "./modules/theme_setting";
import { SettingManager } from "./settings_manager";

export const settings = new SettingManager();

settings.add(new ThemeSetting('theme', 'Appearance'))
settings.add(new BackgroundSetting('background', 'Appearance'))
settings.add(new SearchSetting("search", "Search"));
