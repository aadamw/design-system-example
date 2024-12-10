import React from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldMessage, FieldSlot } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function App() {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <main className="flex min-h-dvh w-dvw items-center justify-center bg-[rgb(27,29,33)] px-2 py-10">
      <section
        className="flex max-w-[400px] flex-col gap-4 rounded-[10px] border border-[rgb(49,51,55)] px-12 py-10"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <header>
          <h1
            id={titleId}
            className="text-xl font-semibold text-[rgb(238,239,241)]"
          >
            Create a workspace
          </h1>
          <p className="text-xs text-[rgb(153,154,156)]" id={descriptionId}>
            Provide necessary information to create a workspace, in order to get
            started.
          </p>
        </header>
        <form className="w-[300px] space-y-4">
          <Field name="companyName" error="Please enter a company name">
            <FieldLabel>Company name</FieldLabel>
            <FieldSlot>
              <Input placeholder="Enter your company name..." />
            </FieldSlot>
            <FieldMessage />
          </Field>
          <Field name="workspaceHandle">
            <FieldLabel>Workspace handle</FieldLabel>
            <FieldSlot>
              <Input prefix="app.attio.com/" placeholder="my-workspace" />
            </FieldSlot>
            <FieldMessage>Please enter a workspace handle</FieldMessage>
          </Field>
          <Field name="workspaceDescription">
            <FieldLabel>Description</FieldLabel>
            <FieldSlot>
              <Textarea placeholder="Enter your workspace description..." />
            </FieldSlot>
            <FieldMessage>Tell us more about your workspace</FieldMessage>
          </Field>
          <Button className="w-full">Create workspace</Button>
        </form>
      </section>
    </main>
  );
}
