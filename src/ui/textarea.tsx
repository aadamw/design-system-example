import React from "react";
import { cn } from "../utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full items-center rounded-[10px] bg-transparent px-2.5 py-2 text-xs text-[rgb(238,239,241)] caret-[rgb(38,109,240)] shadow-[rgb(49,_51,_55)_0px_0px_0px_1px_inset] outline-none transition-shadow focus-within:shadow-[rgb(38,109,240)_0px_0px_0px_1px_inset]",
        "peer-invalid:border-red-500",
        className
      )}
      {...props}
    />
  );
});
