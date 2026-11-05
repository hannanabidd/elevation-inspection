"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage, type FormState } from "@/app/actions";
import {
  ErrorSummary,
  Honeypot,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextField,
} from "@/components/forms";
import { pending as placeholders } from "@/lib/site";

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
};

export function ContactForm() {
  const [state, action, isPending] = useActionState<FormState, FormData>(sendContactMessage, {
    status: "idle",
  });
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <SuccessPanel ref={successRef} title="Thanks for reaching out!">
        We&rsquo;ll get back to you within {placeholders.followUp}.
      </SuccessPanel>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative">
      {state.status === "error" && (
        <ErrorSummary ref={summaryRef} errors={e} labels={labels} message={state.message} />
      )}
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <TextField id="name" label={labels.name} autoComplete="name" defaultValue={v.name} error={e.name} className="sm:col-span-2" />
        <TextField id="email" label={labels.email} type="email" inputMode="email" autoComplete="email" defaultValue={v.email} error={e.email} />
        <TextField id="phone" label={labels.phone} type="tel" inputMode="tel" autoComplete="tel" optional defaultValue={v.phone} error={e.phone} />
        <TextArea id="message" label={labels.message} rows={6} defaultValue={v.message} error={e.message} className="sm:col-span-2" />
      </div>
      <Honeypot />
      <div className="mt-9">
        <SubmitButton pending={isPending}>Send Message</SubmitButton>
      </div>
    </form>
  );
}
