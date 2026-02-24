import { lsm } from "~/utils/localStorage_manager";

export class SettingTemplate {
    constructor(name, heading) {
        this.name = name;
        this.heading = heading;
        this.lsm = lsm;

        this.to_be_saved = {}
        this.preload = false;
    }

    update() {}

    preload_setting() {
        if (this.preload) this.update();
    }

    save(save) {
        if (!save) this.to_be_saved = {}

        for (let key of Object.keys(this.to_be_saved)) {
            this[key] = this.to_be_saved[key]
        }

        this.to_be_saved = {}
        lsm.setItem(this.name, this.get())

        this.update()
    }

    get() {        
        let temp = structuredClone(this) 
        
        const to_be_deleted = ["name", "lsm", "heading", "to_be_saved"]

        for (let deleted_key of to_be_deleted) delete temp[deleted_key]

        return temp 
    }

    export_setting() {
        return {
            [name]: this.get()
        }
    }

    load() {
        this.to_be_saved = lsm.getItem(this.name) || {}

        this.save(true)
    }
}