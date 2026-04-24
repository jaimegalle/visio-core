"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  activeIndex?: number;
  onSelect?: (index: number) => void;
  controls?: boolean;
  indicators?: boolean;
  interval?: number | null;
  fade?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    { activeIndex: controlledIndex, onSelect, controls = true, indicators = true, interval = 5000, fade, className = "", children, ...props },
    ref
  ) => {
    const items = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && (child as React.ReactElement).type === CarouselItem
    );
    const count = items.length;

    const [internalIndex, setInternalIndex] = useState(0);
    const index = controlledIndex !== undefined ? controlledIndex : internalIndex;
    const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

    const goTo = useCallback(
      (i: number) => {
        const next = ((i % count) + count) % count;
        if (controlledIndex === undefined) setInternalIndex(next);
        onSelect?.(next);
      },
      [count, controlledIndex, onSelect]
    );

    const prev = useCallback(() => goTo(index - 1), [goTo, index]);
    const next = useCallback(() => goTo(index + 1), [goTo, index]);

    useEffect(() => {
      if (interval === null || interval === 0) return;
      timerRef.current = setInterval(next, interval);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [interval, next]);

    return (
      <div ref={ref} className={["relative overflow-hidden rounded", className].join(" ")} {...props}>
        <div
          className={
            fade
              ? "relative"
              : "flex transition-transform duration-500 ease-in-out"
          }
          style={!fade ? { transform: `translateX(-${index * 100}%)` } : undefined}
        >
          {items.map((item, i) =>
            React.cloneElement(item as React.ReactElement<Record<string, unknown>>, {
              key: i,
              "data-active": i === index,
              className: [
                (item as React.ReactElement<Record<string, unknown>>).props.className || "",
                fade ? (i === index ? "opacity-100" : "opacity-0 absolute inset-0") : "shrink-0 w-full",
              ].join(" "),
            })
          )}
        </div>

        {indicators && count > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={[
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === index ? "bg-white" : "bg-white/50",
                ].join(" ")}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {controls && count > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
              onClick={prev}
              aria-label="Previous"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
              onClick={next}
              aria-label="Next"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={["relative", className].join(" ")} {...props}>
        {children}
      </div>
    );
  }
);
CarouselItem.displayName = "CarouselItem";

interface CarouselCaptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselCaption = React.forwardRef<HTMLDivElement, CarouselCaptionProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["absolute bottom-10 left-1/2 -translate-x-1/2 rounded bg-black/50 px-4 py-2 text-center text-white", className].join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CarouselCaption.displayName = "CarouselCaption";
