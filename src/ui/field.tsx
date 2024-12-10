import { cn } from "../utils/cn";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type FieldContextType = {
  name: string;
  id: string;
  errorId: string;
  descriptionId: string;
  error?: string;
};

const FieldContext = React.createContext({} as FieldContextType);

const useFieldContext = () => {
  const ctx = React.useContext(FieldContext);

  if (!ctx) {
    throw new Error("Form components must be used within a <Field />");
  }

  return ctx;
};

type FieldProps = {
  name: FieldContextType["name"];
  error?: FieldContextType["error"];
  className?: string;
};

const Field = ({
  name,
  error,
  children,
  className,
}: React.PropsWithChildren<FieldProps>) => {
  const id = React.useId();
  return (
    <FieldContext.Provider
      value={{
        name,
        error,
        id: `field-${name}-${id}`,
        errorId: `field-${name}-error-${id}`,
        descriptionId: `field-${name}-description-${id}`,
      }}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-1 [&>[data-slot=label]]:pl-1 [&>[data-slot=message]]:pl-1",
          className
        )}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const FieldLabel = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) => {
  const { id } = useFieldContext();

  return (
    <label
      data-slot="label"
      htmlFor={id}
      className={cn(
        "w-max text-xs font-medium tracking-tight text-[rgb(159,161,167)]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

const FieldSlot = (props: React.ComponentPropsWithoutRef<typeof Slot>) => {
  const { id, descriptionId, errorId, error } = useFieldContext();

  return (
    <Slot
      id={id}
      aria-invalid={!!error}
      aria-describedby={
        !error ? `${descriptionId}` : `${descriptionId} ${errorId}`
      }
      {...props}
    />
  );
};

const FieldMessage = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => {
  const { errorId, descriptionId, error } = useFieldContext();

  const errorMessage = error ? error : children;

  const getProps = () => {
    if (error) {
      return {
        id: errorId,
        role: "alert",
        "aria-live": "polite",
        className: cn("text-xs font-medium text-[rgb(235,73,71)]", className),
      } as const;
    }

    return {
      id: descriptionId,
      className: cn("text-xs font-medium text-[rgb(159,161,167)]", className),
    } as const;
  };

  return (
    <span data-slot="message" {...getProps()} {...props}>
      {errorMessage}
    </span>
  );
};

export { Field, FieldLabel, FieldSlot, FieldMessage };
