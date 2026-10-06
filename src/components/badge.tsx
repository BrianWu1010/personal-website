type BadgeProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function Badge({ label, active = false, onClick }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs transition-colors";
  const tone = active
    ? "border-accent bg-accent/10 text-accent"
    : "border-border text-muted";

  if (!onClick) return <span className={`${base} ${tone}`}>{label}</span>;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${base} ${tone} cursor-pointer hover:border-accent hover:text-accent`}
    >
      {label}
    </button>
  );
}
