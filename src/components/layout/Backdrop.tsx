/**
 * Fixed atmospheric layer behind every section: blueprint grid, drifting
 * aurora blobs and a film-grain overlay to keep the gradients from banding.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(90%_55%_at_50%_0%,#000_10%,transparent_75%)]" />

      <div className="animate-aurora absolute -top-[22%] -left-[8%] size-[42rem] rounded-full bg-brand-iris/[0.16] blur-[140px]" />
      <div
        className="animate-aurora absolute -top-[10%] right-[-12%] size-[38rem] rounded-full bg-brand-violet/[0.13] blur-[150px]"
        style={{ animationDelay: "-9s", animationDuration: "32s" }}
      />
      <div
        className="animate-aurora absolute top-[38%] left-[24%] size-[34rem] rounded-full bg-brand-cyan/[0.08] blur-[160px]"
        style={{ animationDelay: "-18s", animationDuration: "38s" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,transparent_35%,var(--color-ink)_95%)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
