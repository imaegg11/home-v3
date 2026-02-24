import { SettingTemplate } from "./setting_template";

export class About extends SettingTemplate {
    constructor(name, heading) {
        super(name, heading)
    }

    render() {
        const hash = import.meta.env.PROD ? __COMMIT_HASH__ : "18c97066637ff603233dd318b6d51557ee4b687d"
        const short = hash.slice(0, 7)
        const commit_url = `https://github.com/imaegg11/home-v3/commit/${hash}`

        return (
            <div class="space-y-2 text-sm">
                <p class='mb-4'>Hey, this is just some project that I built for myself. Simple homepage with some random features :)</p>
                <div class="flex">
                    <p>Current commit version: </p>
                    <a
                        href={commit_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex hover:text-accent-30 transition-colors"
                        title={`View deployment commit ${hash}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-commit-vertical-icon lucide-git-commit-vertical"><path d="M12 3v6"/><circle cx="12" cy="12" r="3"/><path d="M12 15v6"/></svg>
                        <p>{short}</p>
                    </a>
                </div>
                <p class='text-gs-50'>© 2026 imaegg11 (or something I don't actually have copyright)</p>
            </div>
        )
    }
}