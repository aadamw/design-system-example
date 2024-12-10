import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "disabled" | "aria-disabled"
> & {
  /**
   * The variant of the button.
   * @default filled
   * @enum filled | outlined
   */
  variant?: "filled" | "outlined";

  /**
   * The mode of the button. Replaces the `disabled` prop.
   * @default idle
   * @enum disabled | loading | idle
   */
  mode?: "disabled" | "loading" | "idle";

  /**
   * Whether the button should be accessible when disabled.
   * @default false
   */
  accessiblyDisabled?: boolean;

  /**
   * The size of the button.
   * @default 34
   * @enum 34 | 40
   */
  size?: 34 | 40;
};

function getAttributes(mode: ButtonProps["mode"], accessiblyDisabled: boolean) {
  if (mode === "disabled") {
    return {
      "aria-disabled": true,
      disabled: accessiblyDisabled,
    } as const;
  }

  if (mode === "loading") {
    return {
      role: "progressbar",
      disabled: accessiblyDisabled,
      "aria-disabled": true,
    } as const;
  }
}
// https://www.w3.org/WAI/ARIA/apg/patterns/button/
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "filled",
      mode = "idle",
      size = 34,
      className,
      accessiblyDisabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--size": `${size}px`,
          } as React.CSSProperties
        }
        type={type}
        {...props}
        {...getAttributes(mode, accessiblyDisabled)}
        className={cn(
          "flex h-[var(--size)] min-h-[var(--size)] items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-normal outline-none transition-all focus-visible:shadow-[rgb(38,109,240)_0px_0px_0px_1px_inset]",
          {
            "bg-[#266DF0] text-white shadow-[inset_0px_0px_0px_1px_rgba(244,245,246,0.1)] hover:bg-[#407FF2] focus-visible:bg-[#407FF2] active:bg-[#407FF2]":
              variant === "filled",
            "bg-transparent text-[rgb(238,239,241)] shadow-[inset_0px_0px_0px_1px_rgba(244,245,246,0.1)] hover:bg-[rgb(49,51,55)] active:bg-[rgb(49,51,55)]":
              variant === "outlined",
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);
