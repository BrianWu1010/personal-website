export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="mb-8 flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
      <span className="font-mono text-sm font-normal text-accent">{index}.</span>
      {title}
      <span className="ml-2 h-px flex-1 bg-border" aria-hidden />
    </h2>
  );
}
