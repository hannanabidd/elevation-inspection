import type { ReactNode, Ref } from "react";
import { site } from "@/lib/site";
import { ArrowRight } from "./icons";

export const inputClass =
  "block w-full border-[1.5px] border-line-strong bg-bg px-4 py-3.5 text-[1.05rem] text-fg transition-colors placeholder:text-muted/70 hover:border-fg/60 focus:border-green focus:outline-none aria-[invalid=true]:border-danger";

function FieldLabel({ htmlFor, children, optional }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3">
      <span className="font-display text-[0.78rem] font-bold tracking-[0.12em] uppercase">{children}</span>
      {optional && <span className="text-sm text-muted">Optional</span>}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-[0.95rem] font-semibold text-danger">
      <span aria-hidden="true" className="mt-[0.3em] block size-2 shrink-0 rotate-45 bg-danger" />
      {error}
    </p>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;

export function TextField({
  id,
  label,
  optional,
  error,
  hint,
  defaultValue,
  type = "text",
  autoComplete,
  inputMode,
  suffix,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`${inputClass} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-muted">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.95rem] text-muted">
          {hint}
        </p>
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  optional,
  error,
  hint,
  defaultValue,
  rows = 5,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-2.5 text-[0.95rem] text-muted">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        name={id}
        rows={rows}
        defaultValue={defaultValue}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputClass} resize-y`}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

/* Radio group shown as chips: every option visible, one tap to choose. */
export function Choices({
  name,
  label,
  options,
  optional,
  error,
  defaultValue,
  className = "",
}: {
  name: string;
  label: string;
  options: readonly string[];
  optional?: boolean;
  error?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <fieldset
      className={className}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className="mb-2 flex w-full items-baseline justify-between gap-3">
        <span className="font-display text-[0.78rem] font-bold tracking-[0.12em] uppercase">{label}</span>
        {optional && <span className="text-sm text-muted">Optional</span>}
      </legend>
      {/* Anchor for the error summary link */}
      <span id={name} tabIndex={-1} className="sr-only" />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`relative inline-flex min-h-12 cursor-pointer items-center border-[1.5px] px-5 font-display text-sm font-bold tracking-[0.06em] uppercase transition-colors select-none has-checked:border-green has-checked:bg-green has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-green hover:border-fg/60 ${
              error ? "border-danger" : "border-line-strong"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              defaultChecked={defaultValue === opt}
              required={!optional}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
      <FieldError id={name} error={error} />
    </fieldset>
  );
}

/* Hidden from people; bots that fill every field get a fake success. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function ErrorSummary({
  errors,
  labels,
  message,
  ref,
}: {
  errors?: Record<string, string>;
  labels: Record<string, string>;
  message?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const entries = Object.entries(errors ?? {});
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="mb-10 border-l-4 border-danger bg-danger/10 p-5 focus:outline-none sm:p-6"
    >
      <p className="font-display font-extrabold uppercase">
        {message ? "We couldn’t send that" : "A few details need fixing"}
      </p>
      {message && <p className="mt-2">{message}</p>}
      {entries.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {entries.map(([field, msg]) => (
            <li key={field}>
              <a href={`#${field}`} className="font-semibold underline decoration-danger underline-offset-4">
                {labels[field] ?? field}
              </a>
              : {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="group/btn chamfer relative inline-flex h-14 w-full items-center justify-center gap-3 bg-green px-8 font-display text-[0.85rem] font-bold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-green-bright disabled:cursor-progress disabled:opacity-80 sm:w-auto"
    >
      {pending ? (
        <>
          <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          Sending&hellip;
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </>
      )}
    </button>
  );
}

/* Shown in place of the form after it sends. */
export function SuccessPanel({
  title,
  children,
  ref,
}: {
  title: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={ref} tabIndex={-1} role="status" className="load-up py-6 focus:outline-none">
      <span className="flex size-20 items-center justify-center bg-green text-ink">
        <svg viewBox="0 0 24 24" className="size-11" aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-now"
            style={{ ["--d" as string]: "350ms" }}
          />
        </svg>
      </span>
      <h2 className="mt-8 text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.02em] uppercase">
        {title}
      </h2>
      <div className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{children}</div>
      <p className="mt-6 text-muted">
        <a href={site.phoneHref} className="font-semibold text-fg underline decoration-green decoration-2 underline-offset-4">
          {site.phone}
        </a>
        <span className="mx-3">/</span>
        <a href={site.emailHref} className="font-semibold break-all text-fg underline decoration-green decoration-2 underline-offset-4">
          {site.email}
        </a>
      </p>
    </div>
  );
}
