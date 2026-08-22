export const availableWidgets = Object.fromEntries(
    Object.values(import.meta.glob("./*.js", {
        eager: true,
        import: "default"
    })).map(widget => [widget.name, widget])
)