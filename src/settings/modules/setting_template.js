import { createSignal } from "solid-js";
import { lsm } from "~/utils/localStorage_manager";

export class SettingTemplate {
    #forceUpdate = createSignal(0)

    constructor(name, heading, settings = {}) {
        this.name = name;
        this.heading = heading;
        this.lsm = lsm;

        this.to_be_saved = {}
        this.preload = false;

        this.settings = {
            ...settings
        }
    }

    /* 
        A bit sketch but what's happening is that I create a signal for 0 and each time it's update, 
        I can force an update somewhere for something and not have it tied to a signal
    */
    getForceUpdate() {
        return this.#forceUpdate[0];
    }

    forceUpdate() {
        return this.#forceUpdate[1](prev => prev + 1);
    }

    update() { }

    preload_setting() {
        if (this.preload) this.update();
    }

    save(shouldSave) {
        if (!shouldSave) {
            this.to_be_saved = {}
            return
        }

        this.settings = {
            ...this.settings,
            ...this.to_be_saved
        }

        this.to_be_saved = {}
        lsm.setItem(this.name, this.get())

        this.update()
    }

    get() {
        return this.settings
    }

    export_setting() {
        return {
            [this.name]: this.get()
        }
    }

    load(data) {
        this.to_be_saved = data

        this.save(true)
    }
}