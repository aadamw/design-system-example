import { cn } from "../utils/cn";
import React from "react";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  /**
   * The size of the input.
   * @default 34
   * @enum 34 | 40
   */
  size?: 34 | 40;
  /**
   * The prefix component of the input.
   */
  prefix?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 34, className, prefix, ...props }, ref) => {
    return (
      <div
        style={
          {
            "--size": `${size}px`,
          } as React.CSSProperties
        }
        className={cn(
          "flex h-[var(--size)] min-h-[var(--size)] w-full items-center rounded-[10px] bg-transparent px-2.5 text-xs text-[rgb(238,239,241)] caret-[rgb(38,109,240)] shadow-[rgb(49,_51,_55)_0px_0px_0px_1px_inset] transition-all focus-within:shadow-[rgb(38,109,240)_0px_0px_0px_1px_inset]",
          "peer-invalid:border-red-500",
          className
        )}
      >
        {prefix && (
          <div className="flex h-[var(--size)] min-h-[var(--size)] select-none items-center text-[rgb(134,136,141)]">
            {prefix}
          </div>
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "h-full w-full bg-transparent outline-none placeholder:text-[rgb(153,154,156)]"
          )}
        />
      </div>
    );
  }
);
