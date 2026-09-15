import { createContext, useContext, createSignal } from "solid-js";

const WidgetContext = createContext()

export function WidgetContextProvider(props) {
    const [addWidget, setAddWidget] = createSignal('')
    const [currentWidget, setCurrentWidget] = createSignal('')
    const page = props.page
    const setPage = props.setPage

    const wrappedSetAddWidget = (widget) => {
        setAddWidget(widget)
        setPage('settingRender')
    }

    return (
        <WidgetContext.Provider value={{
            addWidget, setAddWidget, wrappedSetAddWidget,
            currentWidget, setCurrentWidget,
            page, setPage,
        }}>
            {props.children}
        </WidgetContext.Provider>
    )
}

export function useWidgetContext() {
    return useContext(WidgetContext);
}