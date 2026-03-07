import { EmptyWidget } from "./empty_widget";
import { NewsWidget } from "./news_widget";
import { ProgressWidget } from "./progress_widget";
import { SystemWidget } from "./system_widget";

export const availableWidgets = {
    [new ProgressWidget().name]: ProgressWidget,
    [new EmptyWidget().name]: EmptyWidget,
    [new SystemWidget().name]: SystemWidget,
    [new NewsWidget().name]: NewsWidget,
}
