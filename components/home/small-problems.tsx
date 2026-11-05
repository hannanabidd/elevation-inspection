import { InView } from "@/components/motion";
import { Container, Label } from "@/components/ui";
import { CabinDiagram } from "./cabin-diagram";

const issues = [
  "A clogged gutter",
  "A downspout dumping water at the foundation",
  "Poor drainage",
  "A loose deck connection",
];

export function SmallProblems() {
  return (
    <section className="grain relative overflow-hidden bg-bg-alt py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-14">
        <InView className="lg:col-span-4">
          <div className="rv">
            <Label>Where it starts</Label>
          </div>
          <h2
            className="rv text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
            style={{ ["--d" as string]: "80ms" }}
          >
            Most structural damage starts this small.
          </h2>
          <ol className="mt-10 space-y-0">
            {issues.map((issue, i) => (
              <li
                key={issue}
                className="rv flex items-start gap-4 border-t border-line py-4 last:border-b"
                style={{ ["--d" as string]: `${160 + i * 90}ms` }}
              >
                <span className="flex size-8 shrink-0 items-center justify-center bg-green font-display text-sm font-extrabold text-ink">
                  {i + 1}
                </span>
                <span className="pt-1 text-lg leading-snug font-semibold">{issue}</span>
              </li>
            ))}
          </ol>
          <p className="rv mt-6 text-muted" style={{ ["--d" as string]: "560ms" }}>
            Drag the slider to see what a few years does.
          </p>
        </InView>

        <InView className="rv rv-r lg:col-span-8" threshold={0.15}>
          <CabinDiagram />
        </InView>
      </Container>
    </section>
  );
}
