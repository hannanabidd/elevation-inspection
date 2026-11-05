"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { registerProperty, type FormState } from "@/app/actions";
import {
  Choices,
  ErrorSummary,
  Honeypot,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextField,
} from "@/components/forms";
import { billingOptions, cities, pending as placeholders, propertyTypes, site } from "@/lib/site";

const labels: Record<string, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  address: "Property address",
  city: "City",
  sqft: "Approximate square footage",
  propertyType: "Property type",
  propertyCount: "Number of properties",
  billing: "Billing preference",
  referredBy: "Referred by",
  notes: "Anything we should know?",
};

function Group({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t-2 border-fg pt-6 not-first-of-type:mt-12">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden="true" className="mb-7 flex items-baseline gap-4">
        <span className="font-display text-sm font-extrabold text-muted tabular-nums">{n}</span>
        <span className="font-display text-xl font-extrabold tracking-[0.02em] uppercase">{title}</span>
      </div>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function RegisterForm() {
  const [state, action, isPending] = useActionState<FormState, FormData>(registerProperty, {
    status: "idle",
  });
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <SuccessPanel ref={successRef} title={"Thanks, you’re on the list!"}>
        We&rsquo;ve received your details. Someone from our team will reach out within{" "}
        {placeholders.followUp} to get you set up. Questions in the meantime? Call {site.phone} or
        email {site.email}.
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

      <Group n="01" title="About you">
        <TextField id="fullName" label={labels.fullName} autoComplete="name" defaultValue={v.fullName} error={e.fullName} className="sm:col-span-2" />
        <TextField id="email" label={labels.email} type="email" inputMode="email" autoComplete="email" defaultValue={v.email} error={e.email} />
        <TextField id="phone" label={labels.phone} type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} />
      </Group>

      <Group n="02" title="Your property">
        <TextField id="address" label={labels.address} autoComplete="street-address" defaultValue={v.address} error={e.address} className="sm:col-span-2" />
        <Choices name="city" label={labels.city} options={cities} defaultValue={v.city} error={e.city} className="sm:col-span-2" />
        <TextField
          id="sqft"
          label={labels.sqft}
          inputMode="numeric"
          suffix="sq ft"
          defaultValue={v.sqft}
          error={e.sqft}
          hint="Not sure? A best guess is fine."
        />
        <TextField
          id="propertyCount"
          label={labels.propertyCount}
          inputMode="numeric"
          optional
          defaultValue={v.propertyCount}
          error={e.propertyCount}
        />
        <Choices name="propertyType" label={labels.propertyType} options={propertyTypes} optional defaultValue={v.propertyType} error={e.propertyType} className="sm:col-span-2" />
      </Group>

      <Group n="03" title="Membership">
        <Choices name="billing" label={labels.billing} options={billingOptions} optional defaultValue={v.billing} error={e.billing} />
        <TextField
          id="referredBy"
          label={labels.referredBy}
          optional
          defaultValue={v.referredBy}
          error={e.referredBy}
          hint="Your management or maintenance company."
        />
      </Group>

      <Group n="04" title="Anything else">
        <TextArea
          id="notes"
          label={labels.notes}
          optional
          defaultValue={v.notes}
          error={e.notes}
          hint="For example: deck, hot tub or drainage concerns."
          className="sm:col-span-2"
        />
      </Group>

      <Honeypot />

      <div className="mt-12 border-t border-line pt-8">
        <SubmitButton pending={isPending}>Register My Property</SubmitButton>
        <p className="mt-4 text-[0.95rem] text-muted">
          We only use your information to set up your membership.
        </p>
      </div>
    </form>
  );
}
