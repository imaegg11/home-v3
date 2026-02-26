import { A } from "@solidjs/router";

export default function NotFound() {
    return (
        <main class="relative min-h-screen w-screen overflow-hidden bg-background text-foreground">
            <div class="pointer-events-none absolute inset-0">
                <div class="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/60 blur-3xl"></div>
                <div class="absolute bottom-[-6rem] right-[-6rem] h-80 w-80 rounded-full bg-muted/60 blur-3xl"></div>
            </div>
            <div class="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
                <span class="rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Lost route
                </span>
                <h1 class="mt-6 text-6xl font-semibold tracking-tight sm:text-7xl">404</h1>
                <p class="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                    The page you are looking for does not exist. It may have moved, been renamed, or never existed.
                </p>
                <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <A
                        href="/"
                        class="rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition hover:opacity-90"
                    >
                        Back to home
                    </A>
                </div>
            </div>
        </main>
    );
}
