const files = import.meta.glob("./*.js", {
        eager: true,
    })

const cls = Object.keys(files).filter(path => path.endsWith("_widget.js"))

export const availableWidgets = Object.fromEntries(cls.map(path => [files[path].default.name, files[path].default])) 