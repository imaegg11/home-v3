import { toast } from "solid-sonner";
import { settings } from "../settings";
import { SettingTemplate } from "./setting_template";
import { haveSameTypes } from "~/utils/haveSameType";
import { onCleanup, onMount } from "solid-js";

export class DataSetting extends SettingTemplate {
    render() {

        const load_file = (file) => {
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (r) => {
                try {
                    const json = JSON.parse(r.target.result)

                    if (!haveSameTypes(json, settings.export())) throw new Error("Object does not conform to the settings. Did you import the right file?")

                    settings.load(json)

                    toast.success("Imported successfully")
                } catch (error) {
                    toast.error("Something went wrong... check console");

                    console.log(error)
                }
            }

            reader.onerror = (r) => {
                toast.error("Something went wrong...")
            }
        }

        const import_file = (event) => {
            let file = event.target.files[0]

            load_file(file)
        }

        const download_file = (content, fileName, contentType) => {
            var a = document.createElement("a");
            var file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }

        const exp = () => {
            download_file(JSON.stringify(settings.export()), 'settings.json', "JSON")

            toast.success("Successfully exported settings")
        }

        const reset = () => {
            this.lsm.reset()

            location.reload()
        }

        onMount(() => {

            const dropZone = document.getElementById("drop-zone");

            const window_dragover = (e) => {
                const fileItems = [...e.dataTransfer.items].filter(
                    (item) => item.kind === "file",
                );
                if (fileItems.length > 0) {
                    e.preventDefault();

                    if (!dropZone.contains(e.target)) {
                        e.dataTransfer.dropEffect = "none";
                    }
                }
            }

            const dragover = (e) => {
                const fileItems = [...e.dataTransfer.items].filter(
                    (item) => item.kind === "file",
                );
                if (fileItems.length > 0) {
                    e.preventDefault();
                    if (fileItems.some((item) => item.type.startsWith("application/json"))) {
                        e.dataTransfer.dropEffect = "copy";
                    } else {
                        e.dataTransfer.dropEffect = "none";
                    }
                }
            }

            const dropHandler = (e) => {
                e.preventDefault()
                const file = [...e.dataTransfer.items][0].getAsFile()

                load_file(file)
            }

            dropZone.addEventListener("drop", dropHandler);
            dropZone.addEventListener("dragover", dragover);

            window.addEventListener("dragover", window_dragover)

            onCleanup(() => {
                dropZone.removeEventListener("drop", dropHandler);
                dropZone.removeEventListener("dragover", dragover);
                window.removeEventListener("dragover", window_dragover)
            })
        })

        return (
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm">Export Data</p>
                        <p class='text-xs text-gs-50'>Export all of your data to a JSON file.</p>
                    </div>
                    <button onclick={exp} type="button" class="cursor-pointer rounded-lg border border-gs-90 bg-bg px-3 py-2 text-xs uppercase  text-gs-30 hover:border-gs-80 hover:text-gs-15">Export</button>
                </div>
                <hr class='border-gs-90'></hr>
                <div class='space-y-2'>
                    <div>
                        <p class="text-sm">Import Data</p>
                        <p class='text-xs text-gs-50'>WARNING: All of your current data will be lost.</p>
                    </div>

                    <button onClick={() => { document.getElementById("file-input").click() }} type="button" id='drop-zone' class="w-full rounded-lg border border-dashed border-gs-90 bg-bg p-6 text-center transition hover:border-gs-80 cursor-pointer text-gs-30 hover:text-gs-15">
                        <div class="mx-auto flex flex-col items-center gap-2 disabled:opacity-50 transition-colors">
                            <input onChange={import_file} type="file" accept=".json" class="hidden" id='file-input'></input>
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>
                            <span class="text-xs font-medium">Click to upload JSON settings here</span>
                            <span class="text-[10px] text-gs-50">Or drag and drop your settings.</span>
                        </div>
                    </button>
                </div>
                <hr class='border-gs-90'></hr>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm">Reset Data</p>
                        <p class='text-xs text-gs-50'>WARNING: All of your current data will be lost.</p>
                    </div>
                    <button onclick={reset} type="button" class="cursor-pointer rounded-lg border bg-[#ff5252] px-3 py-2 text-xs uppercase  text-neutral-800 hover:bg-red-500 hover:text-black transition-colors tracking-widest">RESET</button>
                </div>
            </div>
        )
    }
}