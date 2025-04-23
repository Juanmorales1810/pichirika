"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SliderWithTicksProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    tickStep?: number;
    tickFormatter?: (value: number) => string;
    label?: string;
    className?: string;
}

export function SliderWithTicks({
    min,
    max,
    step,
    value,
    onChange,
    tickStep = step,
    tickFormatter = (v) => String(v),
    label,
    className,
}: SliderWithTicksProps) {
    // Genera todos los ticks desde min hasta max con el step especificado
    const ticks = React.useMemo(() => {
        const count = Math.floor((max - min) / step) + 1;
        return Array.from({ length: count }, (_, i) => min + i * step);
    }, [min, max, step]);

    const handleValueChange = React.useCallback(
        (values: number[]) => {
            onChange(values[0]);
        },
        [onChange]
    );

    return (
        <div className={cn("*:not-first:mt-4", className)}>
            {label && <Label>{label}</Label>}
            <div>
                <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={step}
                    onValueChange={handleValueChange}
                    aria-label={label || "Slider"}
                />
                <span
                    className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                    aria-hidden="true"
                >
                    {ticks.map((tickValue, i) => {
                        const shouldShowLabel =
                            (tickValue - min) % tickStep === 0;

                        return (
                            <span
                                key={i}
                                className="flex w-0 flex-col items-center justify-center gap-2"
                            >
                                <span
                                    className={cn(
                                        "bg-muted-foreground/70 h-1 w-px",
                                        !shouldShowLabel && "h-0.5"
                                    )}
                                />
                                <span
                                    className={cn(
                                        !shouldShowLabel && "opacity-0"
                                    )}
                                >
                                    {tickFormatter(tickValue)}
                                </span>
                            </span>
                        );
                    })}
                </span>
            </div>
        </div>
    );
}
