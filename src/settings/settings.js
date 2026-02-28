import { About } from "./modules/about";
import { BackgroundSetting } from "./modules/background_setting";
import { CSSSetting } from "./modules/css_setting";
import { DataSetting } from "./modules/data_setting";
import { SearchSetting } from "./modules/search_setting";
import { ThemeSetting } from "./modules/theme_setting";
import { Widgets } from "./modules/wigets";
import { SettingManager } from "./settings_manager";

export const settings = new SettingManager();

settings.add(new ThemeSetting('theme', 'Appearance'))
settings.add(new BackgroundSetting('background', 'Appearance'))
settings.add(new CSSSetting("css", "Appearance"));
settings.add(new SearchSetting("search", "Search"));
settings.add(new Widgets('widgets', "Widgets"))
settings.add(new DataSetting('data', "Data Management"))
settings.add(new About('about', 'About'))