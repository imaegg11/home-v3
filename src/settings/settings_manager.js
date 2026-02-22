
export class SettingManager {
    constructor() {
        this.settings = [];
    }

    add(setting) {
        if (this.get(setting.name) == null) this.settings.push(setting);
    }

    get(setting_name) {
        let result = null; 

        for (let setting of this.settings) {
            if (setting.name == setting_name) {
                result = setting;
                break;
            }
        }

        return result;
    }

    render() {
        return (
            <div>
                Bum
            </div>
        )
    }
}