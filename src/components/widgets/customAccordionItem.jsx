import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "~/components/ui/accordion"

export const CustomAccordion = ({ index, item, del }) => {
    return (
        <AccordionItem value={index() + ""} id={index() + ""} class="border border-gs-90 bg-bg rounded-xl">
            <AccordionTrigger class='hover:no-underline cursor-pointer px-4 overflow-hidden'>
                <div class="ml-4 flex items-center w-full justify-between text-sm overflow-hidden">
                    <div class="text-left min-w-0">
                        <p class="text-sm truncate">{index() + 1}. {item.constructor.name} Widget</p>
                        <p class="text-xs text-gs-50 truncate">ID: {item.settings.id}</p>
                    </div>
                    <button onClick={(e) => { del(); e.stopPropagation() }} type="button" class="ml-2 cursor-pointer rounded-lg border border-gs-80 bg-bg px-3 py-2 text-[0.65rem] uppercase  text-gs-30 hover:border-gs-60 hover:text-gs-15">REMOVE</button>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {item.render_settings()}
            </AccordionContent>
        </AccordionItem>
    )
}