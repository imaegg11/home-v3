import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  useContext
} from "solid-js"

import createEmblaCarousel from "embla-carousel-solid"

import { cn } from "~/utils/solidui"
import { Button } from "~/components/ui/button"

const CarouselContext = createContext(null)

const useCarousel = () => {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context();
}

const Carousel = (rawProps) => {
  const props = mergeProps({ orientation: "horizontal" }, rawProps)

  const [local, others] = splitProps(props, [
    "orientation",
    "opts",
    "setApi",
    "plugins",
    "class",
    "children"
  ])

  const [carouselRef, api] = createEmblaCarousel(() => ({
    ...local.opts,
    axis: local.orientation === "horizontal" ? "x" : "y"
  }), () => (local.plugins === undefined ? [] : local.plugins))
  const [canScrollPrev, setCanScrollPrev] = createSignal(false)
  const [canScrollNext, setCanScrollNext] = createSignal(false)

  const onSelect = (api) => {
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }

  const scrollPrev = () => {
    api()?.scrollPrev()
  }

  const scrollNext = () => {
    api()?.scrollNext()
  }

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }

  createEffect(() => {
    if (!api() || !local.setApi) {
      return
    }
    local.setApi(api)
  })

  createEffect(() => {
    if (!api()) {
      return
    }

    onSelect(api())
    api().on("reInit", onSelect)
    api().on("select", onSelect)

    return () => {
      api()?.off("select", onSelect)
    };
  })

  const value = createMemo(() =>
    ({
      carouselRef,
      api,
      opts: local.opts,
      orientation: local.orientation || (local.opts?.axis === "y" ? "vertical" : "horizontal"),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext
    }))

  return (
    <CarouselContext.Provider value={value}>
      <div
        onKeyDown={handleKeyDown}
        class={cn("relative", local.class)}
        role="region"
        aria-roledescription="carousel"
        {...others}>
        {local.children}
      </div>
    </CarouselContext.Provider>
  );
}

const CarouselContent = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} class="overflow-hidden">
      <div
        class={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          local.class
        )}
        {...others} />
    </div>
  );
}

const CarouselItem = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      class={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        local.class
      )}
      {...others} />
  );
}

const CarouselPrevious = (rawProps) => {
  const props = mergeProps({ variant: "outline", size: "icon" }, rawProps)
  const [local, others] = splitProps(props, ["class", "variant", "size"])
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      variant={local.variant}
      size={local.size}
      class={cn(
        "absolute size-8 touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        local.class
      )}
      disabled={!canScrollPrev()}
      onClick={scrollPrev}
      {...others}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4">
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>
      <span class="sr-only">Previous slide</span>
    </Button>
  );
}

const CarouselNext = (rawProps) => {
  const props = mergeProps({ variant: "outline", size: "icon" }, rawProps)
  const [local, others] = splitProps(props, ["class", "variant", "size"])
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      variant={local.variant}
      size={local.size}
      class={cn(
        "absolute size-8 touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        local.class
      )}
      disabled={!canScrollNext()}
      onClick={scrollNext}
      {...others}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4">
        <path d="M5 12l14 0" />
        <path d="M13 18l6 -6" />
        <path d="M13 6l6 6" />
      </svg>
      <span class="sr-only">Next slide</span>
    </Button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
