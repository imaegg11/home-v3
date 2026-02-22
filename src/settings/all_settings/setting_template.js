import { lsm } from "~/utils/localStorage_manager";

export class SettingTemplate {
    constructor(name, heading) {
        this.name = name;
        this.heading = heading;
        this.lsm = lsm;
    }

    get() {
        throw new Error("Method get() must be overridden in child");
    }

    export_setting() {
        return {
            [name]: get()
        }
    }
}